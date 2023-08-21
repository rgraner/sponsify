import React from 'react';
import { useParams } from 'react-router-dom';

import Plans from '../plans/Plans'
import './Projects.css';

function ProjectPage() {
  const sponsors = [
    { name: 'Company A', logoUrl: '/images/companies-logo/sponsor_a.png' },
    { name: 'Company B', logoUrl: '/images/companies-logo/sponsor_b.png' },
    { name: 'Company C', logoUrl: '/images/companies-logo/sponsor_c.png' },
  ];

  const { projectId } = useParams();

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
        <Plans projectId={projectId}/>
      </section>
    </div>
  );
}

export default ProjectPage;
