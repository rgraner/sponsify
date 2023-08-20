import React, { useEffect } from 'react';
import { connect } from 'react-redux'; // Import connect from react-redux

const plans = [
    {
      name: 'Gold Plan',
      price: '99',
      benefits: [
        'Logo placement on website',
        'Social media promotion',
        'VIP event access',
      ],
    },
    {
      name: 'Silver Plan',
      price: '49',
      benefits: [
        'Logo placement on website',
        'Social media promotion',
      ],
    },
    {
      name: 'Bronze Plan',
      price: '19',
      benefits: [
        'Logo placement on website',
      ],
    },
];

function Plans() {
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

// const mapStateToProps = (state) => ({
//     plans: state.projects, // Map the plans state to the "plans" prop
//   });

export default Plans; // Connect Plans component to Redux

