import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // Import connect from react-redux


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

const mapStateToProps = (state) => ({
    sponsors: state.sponsors, // Map the sponsors state to the "sponsor" prop
  });

export default connect(mapStateToProps)(Sponsors); // Connect Sponsors component to Redux