const pool = require('../models/pool');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  

const checkout = async (req, res) => {
    // const authenticatedUserId = req.user.id;
    // const sponsorId = req.params.sponsorId;

    try {
        // const sponsorsQuery = await pool.query(
        //     'SELECT id, stripe_customer_id FROM sponsors WHERE id = $1',
        //     [authenticatedUserId]
        //   )

          // Retrieve sponsor ID
        //   const sponsorId = sponsorsQuery.rows[0].id;
        const sponsorId = 13;
        
    
        
          // Retrieve Stripe subscription ID
        //   const stripeCustomerId = sponsorsQuery.rows[0].stripe_customer_id;
        const stripeCustomerId = 'cus_Oda57ROzu0K0TT';
          const stripeSubscriptions = await stripe.subscriptions.list({
            limit: 3,
            customer: stripeCustomerId
          });
          const stripeSubscriptionId = stripeSubscriptions.data[0].id;
        
          // Retrieve  Stripe lookup key by subscription item
          const stripeSubscriptionItems = await stripe.subscriptionItems.list({
            subscription: stripeSubscriptionId,
          });
          const stripeSubscriptionItemId = stripeSubscriptionItems.data[0].id;
          const subscriptionItem = await stripe.subscriptionItems.retrieve(
            stripeSubscriptionItemId
          );
          const stripeLookupKey = subscriptionItem.price.lookup_key;
        
          // RetriEve plan ID and project ID
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