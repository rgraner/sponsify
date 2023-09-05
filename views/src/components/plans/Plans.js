import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPlansByProjectId } from '../../redux/reducers/plansReducer';
import './Plans.css'


function Plans({ plans, fetchPlansByProjectId, projectId }) {
    useEffect(() => {
        if (projectId) {
            fetchPlansByProjectId(projectId);
        }
    }, [fetchPlansByProjectId, projectId]);

    const handleAddToCart = async (planId) => {
        try {
            const response = await fetch('/api/auth/check');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const user = await response.json();
            const userId = user.id;
            
            // Make a POST request to add the plan to the cart
            const response2 = await fetch(`/api/cart/user/${userId}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan_id: planId }), // Send the plan ID in the request body
            });
    
            if (response2.status === 201) {
                // Handle success
                console.log('Plan added to the cart successfully');
    
                // Optionally, dispatch an action to update your Redux store here
                // dispatch(planAddedToCart(planId));
            } else {
                // Handle error
                console.error('Failed to add plan to the cart');
            }
            } catch (error) {
            // Handle network error
            console.error('Network error:', error);
            }
        };

    return (
        <div className="card">
            {plans.map((plan) => (
                <div className="plan-card" key={plan.plan_id}>
                <div className="plan-card-header">
                    <h3>{plan.name}</h3>
                    <p>{plan.price === 0.00 ? 'Free' : `€${plan.price}/Month`}</p>
                </div>
                <div className="plan-card-body">
                    <ul>
                    {plan.benefits.map((benefit) => (
                        <li key={benefit.benefit_id}>{benefit.description}</li>
                    ))}
                    </ul>
                </div>
                <div className="plan-card-footer" onClick={() => handleAddToCart(plan.plan_id)}>Buy Now</div>
                </div>
            ))}
        </div>

    )
};

const mapStateToProps = (state) => ({
    plans: state.plans, 
});

const mapDispatchToProps = {
    fetchPlansByProjectId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans); // Connect Plans component to Redux

