import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPlansByProject } from '../../redux/reducers/plansByProjectReducer';
import { fetchSponsorByUser } from '../../redux/reducers/sponsorByUserReducer';
import { fetchPlansBySponsor } from '../../redux/reducers/plansBySponsorReducer';
import './Plans.css'


function Plans({ 
    plansByProject, 
    fetchPlansByProject,
    sponsorByUser,
    fetchSponsorByUser, 
    plansBySponsor, 
    fetchPlansBySponsor, 
    projectId 
}) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.id;

     // Add a state variable to store the sponsor ID
     const [sponsorId, setSponsorId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (projectId) {
            fetchPlansByProject(projectId);
        }
    }, [fetchPlansByProject, projectId]);

    useEffect(() => {
        // Fetch sponsor information when the component mounts
        if (userId) {
            fetchSponsorByUser(userId);
        }
    }, [fetchSponsorByUser, userId]);

    useEffect(() => {
        // Once you have the sponsor information, set the sponsor ID
        if (sponsorByUser && sponsorByUser.sponsor_id) {
            setSponsorId(sponsorByUser.sponsor_id);
        }
    }, [sponsorByUser]);

    // Fetch plans by sponsor when sponsorId is available
    useEffect(() => {
        if (sponsorId) {
            fetchPlansBySponsor(sponsorId);
        }
    }, [fetchPlansBySponsor, sponsorId]);

    // Project user logged in - needs to be sponsor user to order sponsorship plan
    const handleButtonClick = () => {
        window.alert('To order a sponsorship plan, please log in as a sponsor user');
      };

    // Sponsor user logged in - can only subscribe to one plan per project
    const handleButtonClick2 = () => {
        window.alert('You can only subscribe to one plan per project');
    };

    // Any user logged out - redirect to the login page
    const handleButtoClick3 = () => {
        // Store the current location in local storage
        localStorage.setItem('redirectPath', location.pathname);
        // Redirect to the login page
        navigate('/login');
    };

    // Check if plans is empty before accessing its properties
    if (!plansByProject || plansByProject.length === 0) {
        return <div className="container">Sponsorship plans will be displayed here...</div>; // You can display a loading indicator here
    }


    return (
        <div className="card">
            {/* ensure that the .filter() method is only called when plansByProject is indeed an array, */}
            {Array.isArray(plansByProject) &&
                plansByProject
                    .filter((plan) => !plan.is_plan_archived) // Filter out archived plans
                    .map((plan) => {
                        let content;

                        if (userData) {
                            const isPlanForProject = plansBySponsor.some(plan => plan.project_id === parseInt(projectId));
                            if (userData.user_type === 'sponsor' && plansBySponsor.length > 0 && isPlanForProject) {
                                // content = <p>You can only subscribe to one plan per project</p>;
                                content = <div className="button-style" onClick={handleButtonClick2}>Sponsor Now</div>
                            } else if (userData.user_type === 'sponsor') {
                                const actionURL = `/api/payment/${userData.id}/create-checkout-session`;
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
                            // redirect to login page
                            content = <div className="button-style" onClick={handleButtoClick3}>Sponsor Now</div>
                        }

                        return (
                            <div className="plan-card" key={plan.plan_id}>  
                                <div className="plan-card-header">
                                    <h3>{plan.plan_name}</h3>
                                    <p>{plan.plan_price === 0.00 ? 'Free' : `€${plan.plan_price}/Month`}</p>
                                </div>
                                <div className="plan-card-body">
                                    <ul>
                                    {plan.plan_benefits.map((benefit) => (
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
    sponsorByUser: state.sponsorByUser,
    plansBySponsor: state.plansBySponsor
});

const mapDispatchToProps = {
    fetchPlansByProject,
    fetchSponsorByUser,
    fetchPlansBySponsor
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans); // Connect Plans component to Redux

