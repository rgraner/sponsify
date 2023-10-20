import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSponsor } from '../../redux/reducers/sponsorReducer';
import { fetchPlansBySponsor } from '../../redux/reducers/plansBySponsorReducer';


function SponsorPage({ sponsor, fetchSponsor, plansBySponsor, fetchPlansBySponsor }) {

    const { sponsorId } = useParams();

    useEffect(() => {
        fetchPlansBySponsor(sponsorId);
        fetchSponsor(sponsorId);
    }, [fetchSponsor, fetchPlansBySponsor, sponsorId])

    // Check if projectsBySponsor is empty before accessing its properties
    if (plansBySponsor.length === 0 || plansBySponsor.length === undefined ) {
        return <div className="container">{sponsor.name} doesn't sponsor any project yet...</div>; // You can display a loading indicator here
    }
    
    return (
        <div className="container">
            <div className="page-title companies-logo">
                {sponsor.logo ? (
                    <img
                        src={`/images/companies-logo/${sponsor.logo}`}
                        alt={sponsor.name}
                        onError={(e) => {
                            e.target.src = '/images/companies-logo/missing-image.svg';
                        }}
                    />
                ) : (
                    <img
                        src="/images/companies-logo/missing-image.svg"
                        alt="Missing Logo"
                    />
                )}
                <h1>{sponsor.name}</h1>
            </div>
            <div className="section-title">
                <h2>Projects we sponsor</h2>
            </div>
                <ul className="items no-list">
                    {plansBySponsor.map((plan) => (
                        <li key={plan.plan_id}>
                            <div className="companies-logo">
                            {plan.plan_name}
                                
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
    sponsor: state.sponsor,
    plansBySponsor: state.plansBySponsor
  });
  
  const mapDispatchToProps = {
    fetchSponsor,
    fetchPlansBySponsor
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SponsorPage);
  