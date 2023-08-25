import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer'; 
import projectsBySponsorReducer from './projectsBySponsorReducer';
import sponsorsReducer from './sponsorsReducer';
import sponsorsByProjectReducer from './sponsorsByProjectReducer';
import plansReducer from './plansReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  projectsBySponsor: projectsBySponsorReducer,
  sponsors: sponsorsReducer,
  sponsorsByProject: sponsorsByProjectReducer,
  plans: plansReducer,
});

export default rootReducer;
