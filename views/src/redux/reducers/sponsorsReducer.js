const initialState = [
  { id: 1, name: 'Company A', logoUrl: '/images/companies-logo/company-a.png' },
  { id: 2, name: 'Company B', logoUrl: '/images/companies-logo/company-b.png' },
  { id: 3, name: 'Company C', logoUrl: '/images/companies-logo/company-c.png' },
  { id: 4, name: 'Company D', logoUrl: '/images/companies-logo/company-d.png' },
  { id: 5, name: 'Company E', logoUrl: '/images/companies-logo/company-e.png' },
];

const sponsorsReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    return state;
};

export default sponsorsReducer;