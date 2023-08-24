import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer'; 
import projectReducer from './projectReducer'; 
import sponsorsReducer from './sponsorsReducer';
import sponsorsByProjectReducer from './sponsorsByProjectReducer';
import plansReducer from './plansReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  project: projectReducer,
  sponsors: sponsorsReducer,
  sponsorsByProject: sponsorsByProjectReducer,
  plans: plansReducer,
});

export default rootReducer;
