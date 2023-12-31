import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject } from '../../redux/reducers/projectReducer';
import { fetchSponsorsByProject } from '../../redux/reducers/sponsorsByProjectReducer';

import Plans from '../plans/Plans'
import './Projects.css';

function ProjectPage({ project, fetchProject, sponsorsByProject, fetchSponsorsByProject }) {

  const { projectId } = useParams();

  useEffect(() => {
    fetchSponsorsByProject(projectId);
    fetchProject(projectId);
  }, [fetchSponsorsByProject, fetchProject, projectId]);

  return (
    <div className="container">
      <div className="page-title companies-logo">
        {project.logo ? (
          <img
            src={`/images/companies-logo/${project.logo}`}
            alt={project.name}
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
        <div className="items no-list">
          {sponsorsByProject[0].sponsors
          .filter((sponsor) => sponsor.is_subscription_active === true)
          .map((sponsor) => (
            <li key={sponsor.sponsor_id}>
              <div className="companies-logo">
                  <Link to={`/sponsors/${sponsor.sponsor_id}`}>
                    {sponsor.sponsor_logo ? (
                        <img
                            src={`/images/companies-logo/${sponsor.sponsor_logo}`}
                            alt={sponsor.sponsor_name}
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
  project: state.project,
  sponsorsByProject: state.sponsorsByProject
});

const mapDispatchToProps = {
  fetchProject,
  fetchSponsorsByProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
