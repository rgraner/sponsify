import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSponsorsByProject } from '../../redux/reducers/sponsorsByProjectReducer';
import { fetchProject } from '../../redux/reducers/projectReducer';

import Plans from '../plans/Plans'
import './Projects.css';

function ProjectPage({ project, fetchProject, sponsorsByProject, fetchSponsorsByProject }) {

  const { projectId } = useParams();

  useEffect(() => {
    fetchSponsorsByProject(projectId);
    fetchProject(projectId);
  }, [fetchSponsorsByProject, projectId]);

  return (
    <div className="container">
      <div className="page-title companies-logo">
        <img src={`/images/companies-logo/${project.logo}`} alt={project.name} />
        <h1>{project.name}</h1>
      </div>
      
      <section>
        <div className="section-title">
          <h2>Why Sponsor us</h2>
        </div>
        <p>
          {project.description}
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
               <Link to={`/sponsors/${sponsor.id}`}>
                <img src={`/images/companies-logo/${sponsor.logo}`} alt={sponsor.name} />
                <h3>{sponsor.name}</h3>
              </Link>
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
  project: state.project
});

const mapDispatchToProps = {
  fetchSponsorsByProject,
  fetchProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
