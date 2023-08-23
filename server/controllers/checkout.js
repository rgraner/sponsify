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
            return res.status(404).json({ message: 'No items in the cart' });
        }
        
        // Create a new order
        const { plan_id } = cartItem.rows[0];
        await pool.query(
            'INSERT INTO orders (sponsor_id, plan_id) VALUES ($1, $2) RETURNING *',
            [sponsorId, plan_id]
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