const pool = require('../models/pool')
  

const checkout = async (req, res) => {
    const sponsorId = req.params.sponsorId;

    try {
        // Get the sponsor's cart items
        const cartItem = await pool.query(
            'SELECT * FROM cart WHERE sponsor_id = $1',
            [sponsorId]
        );

        // Check if a cart item exists
        if (cartItem.rows.length === 0) {
            return res.status(404).json({ message: 'No item in the cart' });
        };
        
        // Create a new order using the plan_id from the cart item
        const { plan_id } = cartItem.rows[0];
        await pool.query(
            'INSERT INTO orders (sponsor_id, plan_id) VALUES ($1, $2) RETURNING *',
            [sponsorId, plan_id]
        );

        // Get the project_id associated with the plan
        const project = await pool.query(
            'SELECT project_id FROM plans WHERE id = $1',
            [plan_id]
        );

        // Check if a project exists
        if (project.rows.length === 0) {
            return res.status(404).json({ message: 'Associated project with the plan not found' });
        }

        // Insert a new entry into sponsor_projects
        const { project_id } = project.rows[0];
        await pool.query(
            'INSERT INTO sponsor_projects (project_id, sponsor_id) VALUES ($1, $2)',
            [project_id, sponsorId]
        );
        
        // Clear the sponsors's cart
        await pool.query('DELETE FROM cart WHERE sponsor_id = $1', [sponsorId]);
        
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { checkout };