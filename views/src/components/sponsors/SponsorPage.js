import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSponsor } from '../../redux/reducers/sponsorReducer';
import { fetchProjectsBySponsor } from '../../redux/reducers/projectsBySponsorReducer';


function SponsorPage({ sponsor, fetchSponsor, projectsBySponsor, fetchProjectsBySponsor }) {

    const { sponsorId } = useParams();

    useEffect(() => {
        fetchProjectsBySponsor(sponsorId);
        fetchSponsor(sponsorId);
    }, [fetchSponsor, fetchProjectsBySponsor, sponsorId])

    // Check if projectsBySponsor is empty before accessing its properties
    if (projectsBySponsor.length === 0 || projectsBySponsor.length === undefined ) {
        return <div className="container">{sponsor.name} doesn't sponsor any project yet...</div>; // You can display a loading indicator here
    }
    
    return (
        <div className="container">
            <div className="page-title companies-logo">
                <img
                    src={`/images/companies-logo/${sponsor.logo}`}
                    alt={sponsor.name}
                    onError={(e) => {
                        e.target.src = '/images/companies-logo/missing-image.svg';
                    }}
                />
                <h1>{sponsor.name}</h1>
            </div>
            <div className="section-title">
                <h2>Projects we sponsor</h2>
            </div>
                <ul className="items no-list">
                    {projectsBySponsor[0].projects.map((project) => (
                        <li key={project.project_id}>
                            <div className="companies-logo">
                                <Link to={`/projects/${project.project_id}`}>
                                    <img src={`/images/companies-logo/${project.project_logo}`} alt={project.project_name}></img>
                                    <h3>{project.project_name}</h3>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            <div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    sponsor: state.sponsor,
    projectsBySponsor: state.projectsBySponsor
  });
  
  const mapDispatchToProps = {
    fetchSponsor,
    fetchProjectsBySponsor
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SponsorPage);
  