import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import projectReducer from './projectReducer'; 
import projectsBySponsorReducer from './projectsBySponsorReducer';
import sponsorsReducer from './sponsorsReducer';
import sponsorReducer from './sponsorReducer';
import sponsorsByProjectReducer from './sponsorsByProjectReducer';
import plansReducer from './plansReducer';
import registrationReducer from './registrationReducer';
import authenticationReducer from './authenticationReducer';
import cartItemReducer from './cartItemReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  project: projectReducer,
  projectsBySponsor: projectsBySponsorReducer,
  sponsors: sponsorsReducer,
  sponsor: sponsorReducer,
  sponsorsByProject: sponsorsByProjectReducer,
  plans: plansReducer,
  registration: registrationReducer,
  authentication: authenticationReducer,
  cartItem: cartItemReducer,
});

export default rootReducer;
