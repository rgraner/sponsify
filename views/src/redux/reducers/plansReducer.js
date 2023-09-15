// Action Types:
const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';

// Action Creators
const fetchPlansSuccess = (plans) => ({
  type: FETCH_PLANS_SUCCESS,
  payload: plans,
});

// Async Action Creator
export const fetchPlans = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8000/api/plans');
      const plans = await response.json();
      dispatch(fetchPlansSuccess(plans));
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const plansReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_PLANS_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default plansReducer;