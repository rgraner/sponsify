// Action Types:
const FETCH_SPONSORS_BY_PROJECT_SUCCESS = 'FETCH_SPONSORS_BY_PROJECT_SUCCESS';

// Action Creators
const fetchSponsorsByProjectSuccess = (sponsors) => ({
  type: FETCH_SPONSORS_BY_PROJECT_SUCCESS,
  payload: sponsors,
});

// Async Action Creator
export const fetchSponsorsByProject = (projectId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/sponsors/project/${projectId}`);
      const sponsors = await response.json();
      dispatch(fetchSponsorsByProjectSuccess(sponsors));
    } catch (error) {
      console.error('Error fetching sponsor:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const sponsorsByProjectReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_SPONSORS_BY_PROJECT_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default sponsorsByProjectReducer;