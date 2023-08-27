// Action Type:
const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';

// Action Creators:
const fetchPlansSuccess = (plans) => ({
  type: FETCH_PLANS_SUCCESS,
  payload: plans,
});

// ASync Action Creator
export const fetchPlansByProjectId = (projectId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/api/plans/project/${projectId}`)
      const plans = await response.json();
      dispatch(fetchPlansSuccess(plans));
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Handle error actions if needed
    }
  };
};

const initialState = [];
  
const plansReducer = (state = initialState, action) => {
  // You can handle actions and update state here (e.g., add, delete, or modify plans)
  switch (action.type) {
    case FETCH_PLANS_SUCCESS:
      return action.payload;
    // Handle other actions if needed
    default:
      return state;
  }
};

export default plansReducer;