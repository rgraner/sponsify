import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjectsBySponsor } from '../../redux/reducers/projectsBySponsorReducer';


function SponsorPage({ projectsBySponsor, fetchProjectsBySponsor }) {

    const { sponsorId } = useParams();

    useEffect(() => {
        fetchProjectsBySponsor(sponsorId);
    }, [fetchProjectsBySponsor, sponsorId])

    // Check if projectsBySponsor is empty before accessing its properties
    if (projectsBySponsor.length === 0 || projectsBySponsor.length === undefined ) {
        return <div className="container">Loading...</div>; // You can display a loading indicator here
    }
    
    return (
        <div className="container">
            <h1 className="page-title">{projectsBySponsor[0].sponsor}</h1>
            <div className="section-title">
                <h2>Projects we sponsor</h2>
            </div>
            <ul className="items no-list">
                {projectsBySponsor[0].projects.map((project) => (
                    <li key={project.sponsor}>
                        <div className="companies-logo">
                            {/* <Link to={`/projects/${project.id}`}> */}
                                <img src={`/images/companies-logo/${project.project_logo}`} alt={project.project_name}></img>
                                <h3>{project.project_name}</h3>
                            {/* </Link> */}
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
    projectsBySponsor: state.projectsBySponsor,
  });
  
  const mapDispatchToProps = {
    fetchProjectsBySponsor,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SponsorPage);