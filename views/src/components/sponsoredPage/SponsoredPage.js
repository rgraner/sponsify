import React from 'react';
import './SponsoredPage.css';

function SponsoredPage() {
  const sponsors = [
    'Company A',
    'Company B',
    'Company C',
    'Company D',
    'Company E',
  ];

  const sponsorshipPlans = [
    {
      name: 'Gold Plan',
      price: '99',
      benefits: [
        'Logo placement on website',
        'Social media promotion',
        'VIP event access',
      ],
    },
    {
      name: 'Silver Plan',
      price: '49',
      benefits: [
        'Logo placement on website',
        'Social media promotion',
      ],
    },
    {
      name: 'Bronze Plan',
      price: '19',
      benefits: [
        'Logo placement on website',
      ],
    },
  ];

  return (
    <div className="container">
      <section>
        <h2>Why Sponsor us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Nullam scelerisque diam sit amet est iaculis, nec sagittis nunc porta. 
          Phasellus accumsan feugiat felis, nec efficitur ex convallis et. 
          Quisque nec volutpat ex, sed rhoncus metus. 
          Suspendisse nec laoreet velit. Integer sed suscipit libero.
        </p>
      </section>

      <section>
        <h2>Sponsors</h2>
        <ul className="items no-list">
          {sponsors.map((company, index) => (
            <li key={index}>{company}</li>
          ))}
      </ul>
      </section>

      <section>
        <h2>Plans</h2>
        <div className="card">
          {sponsorshipPlans.map((plan, index) => (
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
        
      </section>
    </div>
  );
}

export default SponsoredPage;
