// Action Types:
const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';

// Action Creators
const fetchProjectSuccess = (project) => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: project,
});

// Async Action Creator
export const fetchProject = (projectId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const project = await response.json();
      dispatch(fetchProjectSuccess(project));
    } catch (error) {
      console.error('Error fetching project:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const projectReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_PROJECT_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default projectReducer;