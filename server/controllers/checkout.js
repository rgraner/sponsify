const pool = require('../models/pool')
  

const checkout = async (req, res) => {
    const sponsorId = req.params.sponsorId;

    try {
        // Get the sponsor's cart items
        const cartItems = await pool.query(
            'SELECT * FROM cart WHERE sponsor_id = $1',
            [sponsorId]
        );
        
        // Create a new order for each cart item
        for (const cartItem of cartItems.rows) {
            const { plan_id } = cartItem;
            
            // Create a new order
            const newOrder = await pool.query(
                'INSERT INTO orders (sponsor_id, plan_id) VALUES ($1, $2) RETURNING *',
                [sponsorId, plan_id]
            );
        }
        
        
        // Clear the sponsors's cart
        await pool.query('DELETE FROM cart WHERE sponsor_id = $1', [sponsorId]);
        
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { checkout };