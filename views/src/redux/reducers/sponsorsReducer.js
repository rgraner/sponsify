// Action Types:
const FETCH_SPONSORS_SUCCESS = 'FETCH_SPONSORS_SUCCESS';

// Action Creators
const fetchSponsorsSuccess = (sponsors) => ({
  type: FETCH_SPONSORS_SUCCESS,
  payload: sponsors,
});

// Async Action Creator
export const fetchSponsors = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8000/api/sponsors');
      const sponsors = await response.json();
      dispatch(fetchSponsorsSuccess(sponsors));
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const sponsorsReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_SPONSORS_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default sponsorsReducer;