import React from 'react';


function SponsorPage() {

    const sponsor = {
        id:1,
        name: 'Company A',
        projects: ['Org Y', 'Org Z']
        // Add other sponsor data as needed.
      };

    
    return (
        <div className="container">
            <h1>Organizations we sponsor</h1>
            <ul>
                {sponsor.projects.map((entity, index) => (
                    <li key={index}>{entity}</li>
                ))}
            </ul>
        </div>
    )

}

export default SponsorPage;