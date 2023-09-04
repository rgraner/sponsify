const pool = require('../models/pool')


const getCartItem = async (req, res) => {
const { userId } = req.params;

    try {
        // Check if the sponsor exists
        const user = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the sponsorship plan in the cart
        const cartItem = await pool.query(
            'SELECT c.user_id, p.name, p.price FROM cart c \
            JOIN plans p ON p.id = c.plan_id \
            WHERE c.user_id = $1',
            [userId]
        );
        if (cartItem.rows.length === 0) {
            return res.status(404).json({ message: 'No sponsorship plan in the cart' });
        }
    
        res.status(200).json(cartItem.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Add a sponsorship plan to the cart
const addToCart = async (req, res) => {
    const { userId } = req.params;
    const { plan_id } = req.body;

    try {
        // Check if there is already an item in the cart
        const existingCartItem = await pool.query(
            'SELECT * FROM cart WHERE user_id = $1',
            [userId]
        );

        if (existingCartItem.rows.length > 0) {
            return res.status(400).json({ message: 'Cart already has a sponsorship plan' });
        }

        // Insert the item into the cart 
        await pool.query(
            'INSERT INTO cart (user_id, plan_id) VALUES ($1, $2)',
            [userId, plan_id]
        );

        res.status(201).json({ message: 'Plan added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a cart item
const deleteCartItem = async (req, res) => {
    const { cartId } = req.params;
  
    try {
      // Check if the cart item exists
      const cartItem = await pool.query(
        'SELECT * FROM cart WHERE id = $1',
        [cartId]
      );
  
      if (cartItem.rows.length === 0) {
        return res.status(404).json({ message: 'Plan not found in the cart' });
      }
  
      // Delete the cart item
      await pool.query(
        'DELETE FROM cart WHERE id = $1',
        [cartId]
      );
  
      res.status(200).send('Plan removed from the cart successfully'); // Respond with a 204 status (No Content) for a successful deletion.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getCartItem,
    addToCart,
    deleteCartItem,
};

