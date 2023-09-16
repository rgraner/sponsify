import React, { useEffect, useState } from 'react';
import PaymentSuccess from './PaymentSuccess';

const Message = ({ message }) => (
    <div className='container'>
      <p>{message}</p>
    </div>
  );

export default function PaymentFlow() {
  // State to manage success, sessionId, and message
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [plan, setPlan] = useState('');
  let [project, setProject] = useState('');

  useEffect(() => {
    // Check URL parameters and set state accordingly
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
      setPlan(query.get('plan'));
      setProject(query.get('project'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Subscription canceled -- continue visiting our web and checkout when you're ready."
      );
    }
  }, []); // Dependency array can be empty if this code should run once on component mount

  // Conditionally render components based on success and message
  if (!success && message === '') {
    // return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <PaymentSuccess sessionId={sessionId} plan={plan} project={project} />;
  } else {
    return <Message message={message} />;
  }
}
