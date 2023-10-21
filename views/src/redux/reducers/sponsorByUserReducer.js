// Action Types:
const FETCH_SPONSOR_BY_USER_SUCCESS = 'FETCH_SPONSOR_BY_USER_SUCCESS';

// Action Creators
const fetchSponsorByUserSuccess = (sponsor) => ({
  type: FETCH_SPONSOR_BY_USER_SUCCESS,
  payload: sponsor,
});

// Async Action Creator
export const fetchSponsorByUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/sponsors/user/${userId}`);
      const sponsor = await response.json();
      dispatch(fetchSponsorByUserSuccess(sponsor));
    } catch (error) {
      console.error('Error fetching sponsor:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const sponsorByUserReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_SPONSOR_BY_USER_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default sponsorByUserReducer;