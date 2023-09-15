import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPlansByProject } from '../../redux/reducers/plansByProjectReducer';
import './Plans.css'


function Plans({ plansByProject, fetchPlansByProject, projectId }) {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (projectId) {
            fetchPlansByProject(projectId);
        }
    }, [fetchPlansByProject, projectId]);

    const handleButtonClick = () => {
        window.alert('To order a sponsorship plan, please log in as a sponsor user');
      };

    const handleSponsorNowButton = () => {
        // Store the current location in local storage
        localStorage.setItem('redirectPath', location.pathname);
        
        // Redirect to the login page
        navigate('/login');
    };

    // Check if plans is empty before accessing its properties
    if (plansByProject.length === 0 || plansByProject.length === undefined ) {
        return <div className="container">Sponsorship plans will be displayed here...</div>; // You can display a loading indicator here
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    const actionURL = `/api/payment/${userData.id}/create-checkout-session`;

    return (
        <div className="card">
            {plansByProject
                .filter((plan) => !plan.is_archived) // Filter out archived plans
                .map((plan) => {
                    let content;

                    if (userData) {
                        if (userData.user_type === 'sponsor') {
                            content = (
                                <form action={actionURL} method="POST">
                                    {/* Add a hidden field with the lookup_key of your Price */}
                                    <input type="hidden" name="lookup_key" value={plan.stripe_lookup_key} />
                                    <button id="checkout-and-portal-button" type="submit">
                                        Sponsor now
                                    </button>
                                </form>
                            );
                        } else {
                            // content = <p>Please login as a sponsor to subscribe</p>;
                            content = <div className="button-style" onClick={handleButtonClick}>Sponsor Now</div>
                        }
                    } else {
                        // content = <p>Please login as a sponsor to subscribe</p>;
                        content = <div className="button-style" onClick={handleSponsorNowButton}>Sponsor Now</div>
                    }

                    return (
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
                            <div className="plan-card-footer">
                                {content}   
                                {/* <div className="plan-card-footer" onClick={() => handleAddToCart(plan.plan_id)}> */}
                            </div>
                        </div>
                    );   
                })}
        </div>
    )
};

const mapStateToProps = (state) => ({
    plansByProject: state.plansByProject, 
});

const mapDispatchToProps = {
    fetchPlansByProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans); // Connect Plans component to Redux

