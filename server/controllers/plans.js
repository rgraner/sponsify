const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const pool = require('../models/pool');
const randomNumber = require("../utils/randomNumber");
const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

// Get all plans
const getAllPlans = async (req, res) => {
    try {
        const plansData = await pool.query(
            'SELECT\
            plans.id AS plan_id,\
            plans.project_id,\
            plans.name AS plan_name,\
            plans.price AS plan_price,\
            plan_benefits.benefit,\
            plan_benefits.id AS plan_benefit_id,\
            plans.stripe_lookup_key,\
            plans.is_archived AS is_plan_archived,\
            plans.created_at,\
            plans.updated_at\
            FROM plans\
            LEFT JOIN plan_benefits ON plans.id = plan_benefits.plan_id'
        );

        if (plansData.rows.length === 0) {
            return res.status(404).json({ message: 'No plans found' });
        }

        // Group the results by plan ID and collect benefits in an array
        const result = [];

        plansData.rows.forEach((row) => {
            const planId = row.plan_id;
        
            if (!result[planId]) {
                result[planId] = {
                    project_id: row.project_id,
                    plan_id: planId, 
                    plan_name: row.plan_name,
                    plan_price: parseFloat(row.plan_price),
                    plan_benefits: [],
                    stripe_lookup_key: row.stripe_lookup_key,
                    is_plan_archived: row.is_plan_archived,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                };
            }
        
            result[planId].plan_benefits.push({
                benefit_id: row.plan_benefit_id,
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

// Get plans for a specific project_id
const getPlansByProjectId = async (req, res) => {
    const projectId = req.params.projectId; 

    try {
        const plansData = await pool.query(
            'SELECT\
            plans.id AS plan_id,\
            plans.project_id,\
            plans.name AS plan_name,\
            plans.price AS plan_price,\
            plan_benefits.benefit,\
            plan_benefits.id AS benefit_id,\
            plans.stripe_lookup_key,\
            plans.is_archived AS is_plan_archived,\
            plans.created_at,\
            plans.updated_at\
            FROM plans\
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
            const planId = row.plan_id;
        
            if (!result[planId]) {
                result[planId] = {
                    project_id: row.project_id,
                    plan_id: planId, 
                    plan_name: row.plan_name,
                    plan_price: parseFloat(row.plan_price),
                    plan_benefits: [],
                    stripe_lookup_key: row.stripe_lookup_key,
                    is_plan_archived: row.is_plan_archived,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                };
            }
        
            result[planId].plan_benefits.push({
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

// Get plans by sponsor ID
const getPlansBySponsorId = async (req, res) => {
    const sponsorId = req.params.sponsorId;

    try {
        const plansData = await pool.query(
            'SELECT\
            orders.sponsor_id,\
            plans.id AS plan_id,\
            plans.project_id,\
            plans.price AS plan_price,\
            plans.name AS plan_name,\
            plan_benefits.id AS benefit_id,\
            plan_benefits.benefit,\
            plans.stripe_lookup_key,\
            plans.is_archived AS is_plan_archived,\
            orders.is_subscription_active AS is_plan_subscription_active,\
            plans.created_at,\
            plans.updated_at\
            FROM plans\
            LEFT JOIN plan_benefits ON plans.id = plan_benefits.plan_id\
            INNER JOIN orders ON orders.plan_id = plans.id\
            WHERE orders.sponsor_id = $1',
            [sponsorId]
        );

        if (plansData.rows.length === 0) {
            return res.status(404).json({ message: 'No plans found for this sponsor' });
        }

        // Group the results by plan ID and collect unique benefits 
        const result = {};

        plansData.rows.forEach((row) => {
            const planId = row.plan_id;

            if (!result[planId]) {
                result[planId] = {
                    sponsor_id: row.sponsor_id,
                    plan_id: planId,
                    project_id: row.project_id,   
                    plan_price: parseFloat(row.plan_price),
                    plan_name: row.plan_name,
                    plan_benefits: [],
                    stripe_lookup_key: row.stripe_lookup_key,
                    is_plan_archived: row.is_plan_archived,
                    is_plan_subscription_active: row.is_plan_subscription_active,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                };
            }

            if (
                !result[planId].plan_benefits.some(
                    (benefit) => benefit.benefit_id === row.benefit_id
                )
            ) {
                result[planId].plan_benefits.push({
                    benefit_id: row.benefit_id,
                    description: row.benefit,
                });
            }
        });

        const uniquePlans = Object.values(result);

        res.status(200).json(uniquePlans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get plans by sponsor user ID
const getPlansBySponsorUserId = async (req, res) => {
    const userId = req.user.id; //authenticated user

    try {
        const plansData = await pool.query(
            'SELECT\
            users.id AS user_id,\
            orders.id AS order_id,\
            orders.sponsor_id,\
            projects.name AS project_name,\
            plans.id AS plan_id,\
            plans.price AS plan_price,\
            plans.name AS plan_name,\
            plan_benefits.id AS benefit_id,\
            plan_benefits.benefit,\
            plans.stripe_lookup_key,\
            plans.is_archived AS is_plan_archived,\
            orders.is_subscription_active AS is_plan_subscription_active,\
            plans.created_at,\
            plans.updated_at\
            FROM plans\
            LEFT JOIN plan_benefits ON plans.id = plan_benefits.plan_id\
            INNER JOIN orders ON orders.plan_id = plans.id\
            INNER JOIN sponsors ON orders.sponsor_id = sponsors.id\
            INNER JOIN projects ON projects.id = plans.project_id\
            INNER JOIN users ON users.id = sponsors.user_id\
            WHERE users.id = $1',
            [userId]
        );

        if (plansData.rows.length === 0) {
            return res.status(404).json({ message: 'No plans found for this sponsor' });
        }

        // Group the results by plan ID and collect unique benefits 
        const result = {};

        plansData.rows.forEach((row) => {
            const planId = row.plan_id;

            if (!result[planId]) {
                result[planId] = {
                    user_id: row.user_id,
                    order_id: row.order_id,
                    sponsor_id: row.sponsor_id,
                    project_name: row.project_name,
                    plan_id: planId,
                    plan_price: parseFloat(row.plan_price),
                    plan_name: row.plan_name,
                    plan_benefits: [],
                    stripe_lookup_key: row.stripe_lookup_key,
                    is_plan_archived: row.is_plan_archived,
                    is_plan_subscription_active: row.is_plan_subscription_active,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                };
            }

            if (
                !result[planId].plan_benefits.some(
                    (benefit) => benefit.benefit_id === row.benefit_id
                )
            ) {
                result[planId].plan_benefits.push({
                    benefit_id: row.benefit_id,
                    description: row.benefit,
                });
            }
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
    const planId = req.params.planId;

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
    getAllPlans,
    getPlansByProjectId,
    getPlansBySponsorId,
    getPlansBySponsorUserId,
    createPlan,
    updatePlan,
    archivePlan,
    // deletePlan,
    deletePlanBenefitById
};



