const pool = require('../models/pool');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// Get all orders
const getAllOrders = async (req, res) => {
	await pool.query(
		'SELECT\
		orders.id AS order_id,\
		sponsors.name AS sponsor,\
		plans.name AS plan,\
		plans.price AS price,\
		orders.stripe_subscription_id,\
		orders.is_active,\
		orders.created_at,\
		orders.updated_at\
		FROM orders\
		INNER JOIN sponsors ON sponsors.id = orders.sponsor_id\
		INNER JOIN plans ON plans.id = orders.plan_id',
		(error, results) => {
			if (error) {
				throw error;
			}
			res.status(200).json(results.rows);
		}
	);
};

// Get order by ID
const getOrderById = async ( req, res) => {
    const orderId = parseInt(req.params.orderId);

    try {
        const order = await pool.query(
			'SELECT\
			orders.id AS order_id,\
			sponsors.name AS sponsor,\
			plans.name AS plan,\
			plans.price AS price,\
			orders.stripe_subscription_id,\
			orders.is_active,\
			orders.created_at,\
			orders.updated_at\
			FROM orders\
			INNER JOIN sponsors ON sponsors.id = orders.sponsor_id\
			INNER JOIN plans ON plans.id = orders.plan_id\
			WHERE orders.id = $1',
			[orderId]
        );

        if(order.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get order by sponsor ID
const getOrdersBySponsorId = async ( req, res) => {
  const sponsorId = parseInt(req.params.sponsorId);

  try {
      const order = await pool.query(
		'SELECT\
		orders.id AS order_id,\
		sponsors.name AS sponsor,\
		plans.name AS plan,\
		plans.price AS price,\
		orders.stripe_subscription_id,\
		orders.is_active,\
		orders.created_at,\
		orders.updated_at\
		FROM orders\
		INNER JOIN sponsors ON sponsors.id = orders.sponsor_id\
		INNER JOIN plans ON plans.id = orders.plan_id\
		WHERE orders.sponsor_id = $1',
        [sponsorId]
      );

      if(order.rows.length === 0) {
          return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }

};


const createOrder = async (req, res) => {
    const { userId, stripeLookupKey, stripeSubscriptionId } = req.params;
    console.log('userId in checkout function:', userId);
    console.log('stripeLookupKey in checkout function:', stripeLookupKey);
    console.log('stripeSubscriptionId in checkout function:', stripeSubscriptionId);
    try {
        // Retrieve sponsor ID
        const sponsorsQuery = await pool.query(
            'SELECT * FROM sponsors WHERE user_id = $1',
            [userId]
        )
        const sponsorId = sponsorsQuery.rows[0].id;
        const stripeCustomerId = sponsorsQuery.rows[0].stripe_customer_id;
        console.log('sponsorId', sponsorId);
        console.log('stripeCustomerId', stripeCustomerId);
    
        // Retrieve plan ID and project ID
        const plansQuery = await pool.query(
            'SELECT id, project_id FROM plans WHERE stripe_lookup_key = $1',
            [stripeLookupKey]
        )
        const planId = plansQuery.rows[0].id;
        const projectId = plansQuery.rows[0].project_id;
        
        await pool.query(
            'INSERT INTO orders (sponsor_id, plan_id, stripe_subscription_id, project_id, is_active) VALUES($1, $2, $3, $4, $5)',
            [sponsorId, planId, stripeSubscriptionId, projectId, true]
        );
        
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update order will only cancel Stripe subscription
const updateOrder = async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    
	// Retrieve Stripe subscription ID
	const ordersQuery = await pool.query(
		'SELECT stripe_subscription_id FROM orders WHERE id = $1',
		[orderId]
	)
	const stripeSubscriptionId = ordersQuery.rows[0].stripe_subscription_id;
  
    try {
      const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
      if (!rows.length) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      const queryText = 'UPDATE orders SET is_active = $1, updated_at = NOW() WHERE id = $2';
      const values = [false, orderId];

	  // Cancel subscription on Stripe API
	  await stripe.subscriptions.cancel(stripeSubscriptionId);
  
      await pool.query(queryText, values);
      return res.status(200).json({ message: 'Subscription cancelled successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
	getAllOrders,
    getOrderById,
    getOrdersBySponsorId,
    createOrder,
    updateOrder,
};
