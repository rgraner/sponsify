const pool = require('../models/pool')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

const createCheckoutSession = async (req, res) => {
    const { userId } = req.params;

    try{
        if (!req.body.lookup_key) {
            return res.status(400).json({ error: 'Invalid lookup_key' });
        }

        // Retrieve the Stripe customer ID
        const queryResult = await pool.query(
            'SELECT stripe_customer_id FROM sponsors WHERE user_id = $1',
            [userId] 
        );
        const stripeCustomerId = queryResult.rows[0].stripe_customer_id;

        const prices = await stripe.prices.list({
            lookup_keys: [req.body.lookup_key],
            expand: ['data.product'],
          });
          const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            customer: stripeCustomerId,
            line_items: [
              {
                price: prices.data[0].id,
                // For metered billing, do not pass quantity
                quantity: 1,
        
              },
            ],
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
          });
        
          res.redirect(303, session.url);

    } catch (error) {
        console.error('Error in createCheckoutSession:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
};

const createPortalSession = async (req, res) => {
    try {
        // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
        // Typically this is stored alongside the authenticated user in your database.
        const { session_id } = req.body;
        console.log('Request body from portal session:', req.body);
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  
        // This is the url to which the customer will be redirected when they are done
        // managing their billing with the portal.
        const returnUrl = YOUR_DOMAIN;
    
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: checkoutSession.customer,
            return_url: returnUrl,
        });
  
        res.redirect(303, portalSession.url);

    } catch (error) {
        console.error('Error in createPortalSession:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const fetchCheckout = async (baseURL) => {
    // Extract the necessary information from the paymentIntent object
  
    try {
      // Make the API request to trigger the checkout
      const response = await fetch(`http://${baseURL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include any necessary data for the checkout
        }),
      });
  
      if (response.ok) {
        // Checkout call successful
        console.log('Checkout call successful');
        // Perform additional actions (e.g., display order summary, clear cart, etc.)
      } else {
        // Error handling for the call
        console.log('Checkout call failed:', response.statusText);
        // Handle the error accordingly
      }
    } catch (error) {
      // Error handling for network or other unexpected errors
      console.log('An error occurred during the checkout call:', error);
      // Handle the error accordingly
    }
  };

const webhook = async (req, res) => {

    let event = req.body;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            endpointSecret
            );
        } catch (error) {
            console.error('Webhook signature verification failed.', error.message);
            return res.sendStatus(400);
        }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
    case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
    case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
    case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
    case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
    case 'payment_intent.succeeded':
        subscription = event.data.object;
        console.log('Subscription was successful!');
        // console.log('subscription.metadata', subscription.metadata);
        // const sponsorId = subscription.metadata.sponsorId;
        // console.log('sponsorId', sponsorId);
        // Trigger the checkout API here
        await fetchCheckout(req.get('host'))
        break;
    default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    res.sendStatus(200); // Acknowledge receipt of the event
}



module.exports = { 
    createCheckoutSession,
    createPortalSession,
    fetchCheckout,
    webhook,
};

