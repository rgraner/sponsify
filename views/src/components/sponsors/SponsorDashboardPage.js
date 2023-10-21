import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSponsorByUser } from '../../redux/reducers/sponsorByUserReducer';
import { fetchPlansBySponsorUserId } from '../../redux/reducers/plansBySponsorUserIdReducer';


function SponsorDashboardPage({ sponsorByUser, fetchSponsorByUser, plansBySponsorUserId, fetchPlansBySponsorUserId }) {
    const { userId } = useParams();

    useEffect(() => {
        fetchSponsorByUser(userId);
        fetchPlansBySponsorUserId(userId);
    }, [fetchSponsorByUser, fetchPlansBySponsorUserId, userId])

    // Check if projectsBySponsor is empty before accessing its properties
    if (!plansBySponsorUserId || plansBySponsorUserId.length === 0) {
        return <div className="container">{sponsorByUser.name} doesn't sponsor any project yet...</div>; // You can display a loading indicator here
    }
    
    return (
        <div className="container">
            <div className="">
                <h1>{sponsorByUser.name}</h1>
            </div>
            <div className="section-title">
                <h2>Projects we sponsor</h2>
            </div>
                <ul className="">
                    {plansBySponsorUserId.map((plan) => (
                        <li key={plan.plan_id}>
                            <div className="">
                            {plan.plan_name}
                            <span>
                                {plan.is_plan_subscription_active ? 'Active' : 'Inactive'}
                            </span>
                            <button>Cancel Plan</button>
                                
                            </div>
                        </li>
                    ))}
                </ul>
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
  