import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import projectReducer from './projectReducer'; 
import projectsBySponsorReducer from './projectsBySponsorReducer';
import sponsorsReducer from './sponsorsReducer';
import sponsorReducer from './sponsorReducer';
import sponsorByUserReducer from './sponsorByUserReducer';
import sponsorsByProjectReducer from './sponsorsByProjectReducer';
import plansReducer from './plansReducer';
import plansByProjectReducer from './plansByProjectReducer';
import plansBySponsorReducer from './plansBySponsorReducer';
import plansBySponsorUserIdReducer from './plansBySponsorUserIdReducer';
import registrationReducer from './registrationReducer';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  project: projectReducer,
  projectsBySponsor: projectsBySponsorReducer,
  sponsors: sponsorsReducer,
  sponsor: sponsorReducer,
  sponsorByUser: sponsorByUserReducer,
  sponsorsByProject: sponsorsByProjectReducer,
  plans: plansReducer,
  plansByProject: plansByProjectReducer,
  plansBySponsor: plansBySponsorReducer,
  plansBySponsorUserId: plansBySponsorUserIdReducer,
  registration: registrationReducer,
  authentication: authenticationReducer,
});

export default rootReducer;
