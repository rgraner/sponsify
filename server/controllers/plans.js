const pool = require('../models/pool')


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
            const existingPlan = result.find((plan) => plan.name === row.name);
            if (!existingPlan) {
                result.push({
                    plan_id: row.id,
                    project_id: row.project_id,
                    price: row.price,
                    name: row.name,
                    benefits: [],
                    created_at: row.created_at,
                    updated_at: row.updated_at
                });
            }
            result[result.length - 1].benefits.push({
                benefit_id: row.benefit_id,
                description: row.benefit
            });
        });
      res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};


const createPlan = (req, res) => {
    const { project_id, name, price, benefits } = req.body;

    // Perform data validation here if needed

    // Insert the new plan into the database
    pool.query(
        'INSERT INTO plans (project_id, name, price) VALUES ($1, $2, $3) RETURNING id',
        [project_id, name, price],
        (error, result) => {
        if (error) {
            console.error('Error creating plan:', error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            const planId = result.rows[0].id;

            // Insert plan benefits if provided
            if (benefits && benefits.length > 0) {
            benefits.forEach((benefit) => {
                pool.query(
                    'INSERT INTO plan_benefits (plan_id, benefit) VALUES ($1, $2)',
                    [planId, benefit],
                    (benefitsError) => {
                        if (benefitsError) {
                            console.error('Error inserting plan benefits:', benefitsError);
                            res.status(500).json({ message: 'Internal server error' });
                        }
                    }
                );
            });
        }
        res.status(201).json({ message: 'Plan created successfully' });
        }
        }
    );
};


module.exports = { 
    getPlansByProjectId,
    createPlan
};



