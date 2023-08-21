const pool = require('../models/pool')

// Get plans for a specific project_id
const getPlansByProjectId = (req, res) => {
    const projectId = req.params.projectId; // Extract the project ID from the request parameters

    pool.query(
        'SELECT plans.*, plan_benefits.benefit FROM plans \
        LEFT JOIN plan_benefits ON plans.id = plan_benefits.plan_id \
        WHERE plans.project_id = $1', 
        [projectId], 
        (error, results) => {
            if (error) {
                throw error;
            }
            // Group the results by plan ID and collect benefits in an array
            const plansWithBenefits = results.rows.reduce((acc, row) => {
                const existingPlan = acc.find(plan => plan.id === row.id);

                if (existingPlan) {
                    existingPlan.benefits.push(row.benefit);
                } else {
                    acc.push({
                        id: row.id,
                        project_id: row.project_id,
                        name: row.name,
                        price: row.price,
                        benefits: row.benefit ? [row.benefit] : [],
                        created_at: row.created_at,
                        updated_at: row.updated_at, 
                    });
                }
                return acc;
            }, []);
            res.status(200).json(plansWithBenefits);
        }
    );
};

module.exports = getPlansByProjectId;



