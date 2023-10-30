import React from 'react';
import { Link } from 'react-router-dom';


const BillingPortal = () => {
    return (
        <Link class="button-style" to="https://billing.stripe.com/p/login/6oEdU2eU6dPhgMMbII" target="_blank">
            Manage your billing information
        </Link>      
    );
};

export default BillingPortal;