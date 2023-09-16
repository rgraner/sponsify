import React from 'react';


const PaymentSuccess = ({ sessionId, plan, project }) => {
    return (
      <div className="container v-center">	
        <section>
          <div className="succesfull-payment-message">
            <p>Subscription to the <strong>{project}</strong> <strong>{plan}</strong> successful!</p>
          </div>
          <form action="/api/payment/create-portal-session" method="POST">
            <input
              type="hidden"
              id="session-id"
              name="session_id"
              value={sessionId}
            />
            <button className="button" id="checkout-and-portal-button" type="submit">
              Manage your billing information
            </button>
          </form>
        </section>
      </div>
    );
};

export default PaymentSuccess;