import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSponsorsByProject } from '../../redux/reducers/sponsorsByProjectReducer';

import Plans from '../plans/Plans'
import './Projects.css';

function ProjectPage({ sponsorsByProject, fetchSponsorsByProject }) {

  const { projectId } = useParams();

  useEffect(() => {
    fetchSponsorsByProject(projectId); // Dispatch the fetchSponsor on component mount
  }, [fetchSponsorsByProject, projectId]);

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
        {sponsorsByProject.length > 0 ? (
        <div className="items">
          {sponsorsByProject.map((sponsor, index) => (
            <div className="companies-logo" key={index}>
              <img src={`/images/companies-logo/${sponsor.logo}`} alt={sponsor.name} />
              <h3>{sponsor.name}</h3>
            </div>
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
