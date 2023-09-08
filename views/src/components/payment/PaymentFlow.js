import React, { useEffect, useState } from 'react';
import PaymentSuccess from './PaymentSuccess';

const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

export default function PaymentFlow() {
  // State to manage success, sessionId, and message
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check URL parameters and set state accordingly
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []); // Dependency array can be empty if this code should run once on component mount

  // Conditionally render components based on success and message
  if (!success && message === '') {
    // return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <PaymentSuccess sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}
