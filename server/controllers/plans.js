const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const pool = require('../models/pool');
const randomNumber = require("../utils/randomNumber");
const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");


// Get plans for a specific project_id
const getPlansByProjectId = async (req, res) => {
    const projectId = req.params.projectId; // Extract the project ID from the request parameters

    try {
        const plansData = await pool.query(
            'SELECT\
            plans.*,\
            plan_benefits.benefit,\
            plan_benefits.id AS benefit_id\
            FROM plans \
            LEFT JOIN plan_benefits ON plans.id = plan_benefits.plan_id\
            WHERE plans.project_id = $1',
            [projectId],
        );

        if (plansData.rows.length === 0) {
            return res.status(404).json({ message: 'No plans found for this project' });
        }

        // Group the results by plan ID and collect benefits in an array
        const result = [];

        plansData.rows.forEach((row) => {
            const planId = row.id;
        
            if (!result[planId]) {
                result[planId] = {
                    plan_id: planId,
                    project_id: row.project_id,
                    price: parseFloat(row.price),
                    name: row.name,
                    benefits: [],
                    stripe_lookup_key: row.stripe_lookup_key,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    is_archived: row.is_archived,
                };
            }
        
            result[planId].benefits.push({
                benefit_id: row.benefit_id,
                description: row.benefit,
            });
        });
        
        const uniquePlans = Object.values(result);
        
        res.status(200).json(uniquePlans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};


const createPlan = async (req, res) => {
    const { project_id, name, price, benefits } = req.body;

    const stripeLookupKey = `project-${project_id}-${name.toLowerCase().replace(/ /g, '-')}-${randomNumber(5)}`;


    const projectName = await pool.query(
        'SELECT DISTINCT projects.name FROM projects JOIN plans ON projects.id = plans.project_id WHERE projects.id = $1;', [project_id]  
    )
    if (projectName.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    };

    const stripeProductName = `${capitalizeFirstLetter(projectName.rows[0].name)} ${capitalizeFirstLetter(name)}`;

    const stripeProduct = await stripe.products.create({
        name: stripeProductName,
    });

    await stripe.prices.create({
        unit_amount: price * 100,
        currency: 'eur',
        recurring: {interval: 'month'},
        product: stripeProduct.id,
        lookup_key: stripeLookupKey
    });

    try {
        // Perform data validation here if needed

        // Insert the new plan into the database
        const planInsertQuery = {
            text: 'INSERT INTO plans (project_id, name, price, stripe_lookup_key) VALUES ($1, $2, $3, $4) RETURNING id',
            values: [project_id, capitalizeFirstLetter(name), price, stripeLookupKey],
        };

        const { rows } = await pool.query(planInsertQuery);
        const planId = rows[0].id;

        // Insert plan benefits if provided
        if (benefits && benefits.length > 0) {
            for (const benefit of benefits) {
                const benefitInsertQuery = {
                    text: 'INSERT INTO plan_benefits (plan_id, benefit) VALUES ($1, $2)',
                    values: [planId, benefit],
                };
                await pool.query(benefitInsertQuery);
            }
        }

        res.status(201).json({ message: 'Plan created successfully' });
    } catch (error) {
        console.error('Error creating plan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updatePlan = async (req, res) => {
    const planId = req.params.planId;
    const { name, price, benefits } = req.body;

  // Validation logic here (check for required fields, data format, etc.)

  try {
    // Start a database transaction
    await pool.query('BEGIN');

    // Update the plan's name and price in the database
    await pool.query(
      'UPDATE plans SET name = $1, price = $2, updated_at = NOW() WHERE id = $3',
      [name, price, planId]
    );

    // Process benefits updates (edit, add, remove)
    for (const benefit of benefits) {
      if (benefit.benefit_id) {
        // If the benefit has an ID, it exists, so update it
        await pool.query(
          'UPDATE plan_benefits SET benefit = $1, updated_at = NOW() WHERE id = $2',
          [benefit.description, benefit.benefit_id]
        );
      } else {
        // If the benefit has no ID, it's a new benefit, so insert it
        await pool.query(
          'INSERT INTO plan_benefits (plan_id, benefit, updated_at) VALUES ($1, $2, NOW())',
          [planId, benefit.description]
        );
      }

    }

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(200).json({ message: 'Plan updated successfully' });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await pool.query('ROLLBACK');

    console.error('Error updating plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const archivePlan = async (req, res) => {
    const planId = req.parmas.planId;

    try {
        // Update the plan's is_archived column to true
        await pool.query(
          'UPDATE plans SET is_archived = true WHERE id = $1',
          [planId]
        );
        res.status(200).json({ message: 'Plan archived successfully' });
    } catch (error) {
        console.error('Error archiving the plan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// const deletePlan = async (req, res) => {
//     const planId = req.params.planId;

//     try {
//         // Perform the delete operation using the planId
//         const result = await pool.query(
//             'DELETE FROM plans WHERE id = $1', 
//             [planId]
//         );

//         if(result.rowCount === 0) {
//             return res.status(404).json({ message: 'Plan not found' });
//         }
//         res.status(200).json({ message: 'Plan deleted successfully' })
//     } catch (error) {
//         console.error('Error deleting plan:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }

// };

const deletePlanBenefitById = async (req, res) => {
    const benefitId = req.params.benefitId;

    try {
        // Delete benefit by id
        await pool.query(
            'DELETE FROM plan_benefits WHERE id = $1', 
            [benefitId]
        );

        res.status(200).json({ message: 'Benefit deleted successfully' })
    } catch (error) {
        console.error('Error deleting benefit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};


module.exports = { 
    getPlansByProjectId,
    createPlan,
    updatePlan,
    archivePlan,
    // deletePlan,
    deletePlanBenefitById
};



