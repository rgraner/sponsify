import React from 'react';


const PaymentSuccess = ({ sessionId }) => {
    return (
      <div className="container v-center">
        <section>
          <div className="message">
            <p>Subscription to starter plan successful!</p>
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