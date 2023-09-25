import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // Import connect from react-redux
import { fetchProjects } from '../../redux/reducers/projectsReducer'; // Import the fetchSponsors action


function Projects({ projects, fetchProjects }) {
    useEffect(() => {
        fetchProjects(); // Dispatch the fetchSponsors action on component mount
    }, [fetchProjects]);

    return (
        <div className="container">
            <h1 className="page-title">Projects</h1>
            <ul className="items no-list">
                {projects.map((project) => (
                    <li key={project.id}>
                        <div className="companies-logo">
                            <Link to={`/projects/${project.id}`}>
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
                                <h3>{project.name}</h3>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => ({
    projects: state.projects, // Map the projects state to the "projects" prop
  });

const mapDispatchToProps = {
    fetchProjects, // Bind the fetchProjects action to props
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects); // Connect Projects component to Redux