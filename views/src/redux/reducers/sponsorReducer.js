// Action Types:
const FETCH_SPONSOR_SUCCESS = 'FETCH_SPONSOR_SUCCESS';

// Action Creators
const fetchSponsorSuccess = (sponsor) => ({
  type: FETCH_SPONSOR_SUCCESS,
  payload: sponsor,
});

// Async Action Creator
export const fetchSponsor = (sponsorId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/sponsors/${sponsorId}`);
      const sponsor = await response.json();
      dispatch(fetchSponsorSuccess(sponsor));
    } catch (error) {
      console.error('Error fetching sponsor:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const sponsorReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_SPONSOR_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default sponsorReducer;