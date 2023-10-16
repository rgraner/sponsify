const pool = require('../models/pool');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  

const checkout = async (req, res) => {
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
            'INSERT INTO orders (sponsor_id, plan_id, stripe_subscription_id) VALUES($1, $2, $3)',
            [sponsorId, planId, stripeSubscriptionId]
        );
    
            await pool.query(
            'INSERT INTO sponsor_projects (sponsor_id, project_id) VALUES($1, $2)',
        [sponsorId, projectId]
        );
        
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { checkout };