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
    plans: state.plans, 
});

const mapDispatchToProps = {
    fetchPlansByProjectId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans); // Connect Plans component to Redux

