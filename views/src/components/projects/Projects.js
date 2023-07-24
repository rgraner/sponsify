import React from 'react';
import { Link } from 'react-router-dom';


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

export default Projects