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
            {plans.map((plan) => (
                <div className="plan-card">
                <div className="plan-card-header">
                    <h3>{plan.name}</h3>
                    <p>{plan.price === 0 ? 'Free' : `€${plan.price}`}</p>
                </div>
                <div className="plan-card-body">
                    <ul>
                    {plan.benefits.map((benefit) => (
                        <li key={benefit.benefit_id}>{benefit.description}</li>
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

