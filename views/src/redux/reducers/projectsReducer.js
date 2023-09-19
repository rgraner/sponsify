// Action Types:
const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';

// Action Creators
const fetchProjectsSuccess = (projects) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

// Async Action Creator
export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/projects');
      const projects = await response.json();
      dispatch(fetchProjectsSuccess(projects));
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const projectsReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_PROJECTS_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default projectsReducer;