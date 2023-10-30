import React from 'react';
import BillingPortal from './BillingPortal';
// import CancelPlan from './CancelPlan';


const SponsorDashboardPage = () => {
    return (
        <div className="container">
            <div className="page-title">
                <h1>Dashboard</h1>
            </div>
            <BillingPortal />
            {/* <CancelPlan /> */}
        </div>
    );
};

export default SponsorDashboardPage;