import React from 'react';
import { Link } from 'react-router-dom';


function PreRegistration() {

    return (
        <div className="container">
            <div className="flex-space-around">
                <div>
                    <Link to="/project-registration" className="button-style">register a project</Link>
                </div>
                <div>
                    <Link to="/sponsor-registration" className="button-style">register as sponsor</Link>
                </div>
            </div>
        </div>
    )
};

export default PreRegistration;
