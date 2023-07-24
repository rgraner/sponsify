import React from 'react';
import { Link } from 'react-router-dom';


function Sponsors({ sponsors }) {
    return (
        <div className="container">
            <h1>Sponsors</h1>
            <ul className="items no-list">
                {sponsors.map((sponsor) => (
                    <li key={sponsor.id}>
                        <div className="companies-logo">
                            <Link to={`/sponsors/${sponsor.id}`}>
                                <img src={sponsor.logoUrl} alt={sponsor.name}></img>
                                <h3>{sponsor.name}</h3>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sponsors