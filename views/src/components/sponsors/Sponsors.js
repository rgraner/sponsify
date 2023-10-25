import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSponsors } from '../../redux/reducers/sponsorsReducer'; // Import the fetchSponsors action

function Sponsors({ sponsors, fetchSponsors }) {
    useEffect(() => {
        fetchSponsors(); // Dispatch the fetchSponsors action on component mount
    }, [fetchSponsors]);

    return (
        <div className="container">
            <h1 className="page-title">Sponsors</h1>
            <ul className="items no-list">
                {sponsors
                .filter((sponsor) => sponsor.is_subscription_active === true)
                .map((sponsor) => (
                    <li key={sponsor.id}>
                        <div className="companies-logo">
                            <Link to={`/sponsors/${sponsor.id}`}>
                                {sponsor.logo ? (
                                    <img
                                        src={`/images/companies-logo/${sponsor.logo}`}
                                        alt={sponsor.name}
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

const mapDispatchToProps = {
    fetchSponsors, // Bind the fetchSponsors action to props
};

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors); // Connect Sponsors component to Redux