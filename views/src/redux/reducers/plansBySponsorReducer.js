// Action Type:
const FETCH_PLANS_BY_SPONSOR_SUCCESS = 'FETCH_PLANS_BY_SPONSOR_SUCCESS';

// Action Creators:
const fetchPlansBySponsorSuccess = (plans) => ({
  type: FETCH_PLANS_BY_SPONSOR_SUCCESS,
  payload: plans,
});

// ASync Action Creator
export const fetchPlansBySponsor = (sponsorId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/plans/sponsor/${sponsorId}`)
      const plans = await response.json();
      dispatch(fetchPlansBySponsorSuccess(plans));
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Handle error actions if needed
    }
  };
};

const initialState = [];
  
const plansBySponsorReducer = (state = initialState, action) => {
  // You can handle actions and update state here (e.g., add, delete, or modify plans)
  switch (action.type) {
    case FETCH_PLANS_BY_SPONSOR_SUCCESS:
      return action.payload;
    // Handle other actions if needed
    default:
      return state;
  }
};

export default plansBySponsorReducer;