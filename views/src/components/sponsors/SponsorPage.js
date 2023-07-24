import React from 'react';
import { useParams } from 'react-router-dom';


function SponsorPage() {
    const { sponsorName } = useParams();

    // You can use the sponsorName to fetch the specific sponsor's data from your data source or API.

    // For example, you can have an array of sponsors and find the matching sponsor by name:
    // const sponsor = sponsors.find((sponsor) => sponsor.name === sponsorName);

    // Replace the following with the actual sponsor and entity data fetched from your data source.

    // const sponsors = [
    //     { 
    //         id: 1,
    //         name: 'Company A', 
    //         logoUrl: '/images/companies-logo/company-a.png',
    //         entities: ['Org X', 'Org Y']
    //     },
    //     { 
    //         id: 2,
    //         name: 'Company B', 
    //         logoUrl: '/images/companies-logo/company-b.png',
    //         entities: ['Org W', 'Org Z'] 
    //     },
    //     { 
    //         id: 3,
    //         name: 'Company C', 
    //         logoUrl: '/images/companies-logo/company-c.png',
    //         entities: ['Org Y', 'Org Z']
    //     },
    //     { 
    //         id: 4,
    //         name: 'Company D', 
    //         logoUrl: '/images/companies-logo/company-d.png',
    //         entities: ['Org X']
    //     },
    //     { 
    //         id: 5,
    //         name: 'Company E', 
    //         logoUrl: '/images/companies-logo/company-e.png',
    //         entities: ['Org W']
    //     },
    //   ];

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