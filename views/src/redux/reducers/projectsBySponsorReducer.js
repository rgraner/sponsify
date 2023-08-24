// Action Types:
const FETCH_PROJECTS_BY_SPONSOR_SUCCESS = 'FETCH_PROJECTS_BY_SPONSOR_SUCCESS';

// Action Creators
const fetchProjectsBySponsorSuccess = (projects) => ({
  type: FETCH_PROJECTS_BY_SPONSOR_SUCCESS,
  payload: projects,
});

// Async Action Creator
export const fetchProjectsBySponsor = (sponsorId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/api/projects/sponsor/${sponsorId}`);
      const projects = await response.json();
      dispatch(fetchProjectsBySponsorSuccess(projects));
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const projectsBySponsorReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_PROJECTS_BY_SPONSOR_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default projectsBySponsorReducer;