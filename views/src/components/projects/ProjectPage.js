import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSponsorsByProject } from '../../redux/reducers/sponsorsByProjectReducer';

import Plans from '../plans/Plans'
import './Projects.css';

function ProjectPage({ sponsorsByProject, fetchSponsorsByProject }) {

  const { projectId } = useParams();

  useEffect(() => {
    fetchSponsorsByProject(projectId);
  }, [fetchSponsorsByProject, projectId]);

  // Check if projectsBySponsor is empty before accessing its properties
  if (sponsorsByProject.length === 0 || sponsorsByProject.length === undefined ) {
    return <div className="container">Loading...</div>; // You can display a loading indicator here
}

  return (
    <div className="container">
      <div className="page-title companies-logo">
        <img src={`/images/companies-logo/${sponsorsByProject[0].project_logo}`} alt={sponsorsByProject[0].project_name} />
        <h1>{sponsorsByProject[0].project_name}</h1>
      </div>
      
      <section>
        <div className="section-title">
          <h2>Why Sponsor us</h2>
        </div>
        <p>
          {sponsorsByProject[0].project_description}
        </p>
      </section>

      <section>
        <div className="section-title">
          <h2>Sponsors</h2>
        </div>
        {sponsorsByProject.length > 0 ? (
        <div className="items no-list">
          {sponsorsByProject[0].sponsors.map((sponsor) => (
            <li key={sponsor.project_name}>
              <div className="companies-logo">
                  <Link to={`/sponsors/${sponsor.sponsor_id}`}>
                      <img src={`/images/companies-logo/${sponsor.sponsor_logo}`} alt={sponsor.sponsor_name}></img>
                      <h3>{sponsor.sponsor_name}</h3>
                  </Link>
              </div>
            </li>
          ))}
        </div>
        ) : (
          <p>Become our first sponsor</p>
        )}
      </section>

      <section>
        <div className="section-title">
          <h2>Become our Sponsor</h2>
        </div>
        <Plans projectId={projectId}/>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sponsorsByProject: state.sponsorsByProject,
});

const mapDispatchToProps = {
  fetchSponsorsByProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
