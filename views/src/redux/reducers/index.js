import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer'; 
import sponsorsReducer from './sponsorsReducer';
import plansReducer from './plansReducer';

const rootReducer = combineReducers({
  projects: projectsReducer, // Add your other reducers here if needed
  sponsors: sponsorsReducer,
  plans: plansReducer,
});

export default rootReducer;
