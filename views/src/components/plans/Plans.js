import React, { useEffect } from 'react';
import { connect } from 'react-redux'; // Import connect from react-redux


function Plans({ plans }) {
    return (
        <div className="card">
            {plans.map((plan, index) => (
                <div className="plan-card" key={index}>
                <div className="plan-card-header">
                    <h3>{plan.name}</h3>
                    <p>{plan.price === 'Free' ? 'Free' : `€${plan.price}`}</p>
                </div>
                <div className="plan-card-body">
                    <ul>
                    {plan.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                    </ul>
                </div>
                <div className="plan-card-footer">Buy Now</div>
                </div>
            ))}
        </div>

    )
};

const mapStateToProps = (state) => ({
    plans: state.plans, // Map the plans state to the "plans" prop
  });

export default connect(mapStateToProps)(Plans); // Connect Plans component to Redux

