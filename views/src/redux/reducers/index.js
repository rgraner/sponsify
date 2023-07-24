import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer'; 
import sponsorsReducer from './sponsorsReducer';

const rootReducer = combineReducers({
  projects: projectsReducer, // Add your other reducers here if needed
  sponsors: sponsorsReducer,
});

export default rootReducer;
