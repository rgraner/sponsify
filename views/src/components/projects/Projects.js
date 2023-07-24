import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // Import connect from react-redux


function Projects({ projects }) {
    return (
        <div className="container">
            <h1>Projects</h1>
            <ul className="items no-list">
                {projects.map((project) => (
                    <li key={project.id}>
                        <div className="companies-logo">
                            <Link to={`/projects/${project.id}`}>
                                <img src={project.logoUrl} alt={project.name}></img>
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

export default connect(mapStateToProps)(Projects); // Connect Projects component to Redux