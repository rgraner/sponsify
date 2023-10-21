// Action Type:
const FETCH_PLANS_BY_SPONSOR_USER_ID_SUCCESS = 'FETCH_PLANS_BY_SPONSOR_USER_ID_SUCCESS';

// Action Creators:
const fetchPlansBySponsorUserIdSuccess = (plans) => ({
  type: FETCH_PLANS_BY_SPONSOR_USER_ID_SUCCESS,
  payload: plans,
});

// ASync Action Creator
export const fetchPlansBySponsorUserId = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/plans/sponsor/user/${userId}`)
      const plans = await response.json();
      dispatch(fetchPlansBySponsorUserIdSuccess(plans));
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Handle error actions if needed
    }
  };
};

const initialState = [];
  
const plansBySponsorUserIdReducer = (state = initialState, action) => {
  // You can handle actions and update state here (e.g., add, delete, or modify plans)
  switch (action.type) {
    case FETCH_PLANS_BY_SPONSOR_USER_ID_SUCCESS:
      return action.payload;
    // Handle other actions if needed
    default:
      return state;
  }
};

export default plansBySponsorUserIdReducer;