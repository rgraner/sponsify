const initialState = [
    { id: 1, name: 'Project X', logoUrl: '/images/companies-logo/project_x.png' },
    { id: 2, name: 'Project Y', logoUrl: '/images/companies-logo/project_y.png' },
    // Add more projects data as needed
  ];

const projectsReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    return state;
};

export default projectsReducer;