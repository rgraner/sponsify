import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSponsorByUser } from '../../redux/reducers/sponsorByUserReducer';
import { fetchPlansBySponsorUserId } from '../../redux/reducers/plansBySponsorUserIdReducer';


function SponsorDashboardPage({ sponsorByUser, fetchSponsorByUser, plansBySponsorUserId, fetchPlansBySponsorUserId }) {
    const [planToCancel, setPlanToCancel] = useState(null);

    useEffect((userId) => {
        fetchSponsorByUser(userId);
        fetchPlansBySponsorUserId(userId);
    }, [fetchSponsorByUser, fetchPlansBySponsorUserId])

    // Function to handle canceling a plan
    const handleCancelPlan = (planId) => {
        // Find the plan with the matching planId
        const selectedPlan = plansBySponsorUserId.find((plan) => plan.plan_id === planId);
    
        if (selectedPlan) {
            // Display a confirmation dialog/modal here and set the plan to cancel
            setPlanToCancel(selectedPlan);
        }
    };
    

    // Function to confirm the cancellation
    const confirmCancelPlan = async (orderId) => {
        try {
            // Make an API request to cancel the selected plan
            if (planToCancel) {
                console.log('Canceling plan', planToCancel);
    
                // Send a POST request to your server
                const response = await fetch(`/api/orders/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.status === 200) {
                    // Plan cancellation was successful
                    console.log('Plan cancelled successfully');

                    // Update the local sate to reflect the plan's new status
                    const updatePlans = plansBySponsorUserId.map((plan) => {
                        if (plan.plan_id === planToCancel.plan_id) {
                            return {
                                ...plan,
                                is_plan_subscription_active: false,
                            };
                        }
                        return plan;
                    })

                    // Update the state with the modified plans array
                    fetchPlansBySponsorUserId(updatePlans);
    
                    // Clear the selected plan
                    setPlanToCancel(null);
                } else {
                    // Handle errors, show an error message to the user, etc.
                    console.error('Plan cancellation failed');
                }
            }
        } catch (error) {
            console.error('Error canceling plan:', error);
        }
    };
    

    // Check if projectsBySponsor is empty before accessing its properties
    if (!plansBySponsorUserId || plansBySponsorUserId.length === 0) {
        return <div className="container">{sponsorByUser.name} doesn't sponsor any project yet...</div>; // You can display a loading indicator here
    }
    
    return (
        <div className="container">
            <div className="page-title">
                <h1>{sponsorByUser.name}</h1>
            </div>
            <div className="section-title">
                <h2>Projects we sponsor</h2>
            </div>
            {plansBySponsorUserId.length > 0 ? (
                <ul className="">
                    {plansBySponsorUserId.map((plan) => (
                        <li key={plan.plan_id}>
                            <div className="">
                                {plan.project_name} - {plan.plan_name}
                                <span> - {plan.is_plan_subscription_active ? (
                                        <>
                                        active - <button onClick={() => handleCancelPlan(plan.plan_id)}>Cancel Sponsorship</button> 
                                        </>          
                                    ) : (
                                        'cancelled'
                                    )}        
                                </span>                               
                            </div>
                        </li>
                    ))}
                </ul>
                ) : (
                    <p>You don't sponsor any project yet...</p>
                  )}
                {/* Add a confirmation modal or dialog here */}
                {planToCancel && (
                    <div className="confirmation-modal">
                        <p>Are you sure you want to cancel the {planToCancel.plan_name} sponsorship of the {planToCancel.project_name}?</p>
                        <button onClick={() => confirmCancelPlan(planToCancel.order_id)}>Yes, Cancel</button>
                        <button onClick={() => setPlanToCancel(null)}>No, Don't Cancel</button>
                    </div>
                )}
            <div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    sponsorByUser: state.sponsorByUser,
    plansBySponsorUserId: state.plansBySponsorUserId
  });
  
  const mapDispatchToProps = {
    fetchSponsorByUser,
    fetchPlansBySponsorUserId
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SponsorDashboardPage);
  