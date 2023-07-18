import React from 'react';

function SponsoredPage() {
  const sponsors = [
    'Company A',
    'Company B',
    'Company C',
    'Company D',
    'Company E',
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
        <ul className="no-list">
          {sponsors.map((company, index) => (
            <li key={index}>{company}</li>
          ))}
      </ul>
      </section>
      

      
    </div>
  );
}

export default SponsoredPage;
