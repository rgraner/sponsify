import React from 'react';
import './SponsoredPage.css';

function SponsoredPage() {
  const sponsors = [
    { name: 'Company A', logoUrl: '/images/companies-logo/company-a.png' },
    { name: 'Company B', logoUrl: '/images/companies-logo/company-b.png' },
    { name: 'Company C', logoUrl: '/images/companies-logo/company-c.png' },
    { name: 'Company D', logoUrl: '/images/companies-logo/company-d.png' },
    { name: 'Company E', logoUrl: '/images/companies-logo/company-e.png' },
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
        <div className="section-title">
          <h2>Why Sponsor us</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Nullam scelerisque diam sit amet est iaculis, nec sagittis nunc porta. 
          Phasellus accumsan feugiat felis, nec efficitur ex convallis et. 
          Quisque nec volutpat ex, sed rhoncus metus. 
          Suspendisse nec laoreet velit. Integer sed suscipit libero.
        </p>
      </section>

      <section>
        <div className="section-title">
          <h2>Sponsors</h2>
        </div>
        <ul className="items no-list">
          {sponsors.map((sponsor, index) => (
            <li key={index}>
              <div className="companies-logo">
                <img src={sponsor.logoUrl} alt={sponsor.name}/>
                <h3>{sponsor.name}</h3>
              </div>
            </li>
          ))}
      </ul>
      </section>

      <section>
        <div className="section-title">
          <h2>Plans</h2>
        </div>
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
