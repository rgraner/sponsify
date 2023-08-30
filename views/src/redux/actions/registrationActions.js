// Action Types for Sponsor Registration
export const REGISTER_SPONSOR_REQUEST = 'REGISTER_SPONSOR_REQUEST';
export const REGISTER_SPONSOR_SUCCESS = 'REGISTER_SPONSOR_SUCCESS';
export const REGISTER_SPONSOR_FAILURE = 'REGISTER_SPONSOR_FAILURE';

// Action Types for Project Registration
export const REGISTER_PROJECT_REQUEST = 'REGISTER_PROJECT_REQUEST';
export const REGISTER_PROJECT_SUCCESS = 'REGISTER_PROJECT_SUCCESS';
export const REGISTER_PROJECT_FAILURE = 'REGISTER_PROJECT_FAILURE';

// Action Type to reset registration
export const RESET_REGISTRATION_STATE = 'RESET_REGISTRATION_STATE';

// Action Creators for Sponsor Registration
export const registerSponsorRequest = () => ({
  type: REGISTER_SPONSOR_REQUEST,
});

export const registerSponsorSuccess = () => ({
  type: REGISTER_SPONSOR_SUCCESS,
});

export const registerSponsorFailure = (error) => ({
  type: REGISTER_SPONSOR_FAILURE,
  payload: error,
});

// Action Creators for Project Registration
export const registerProjectRequest = () => ({
  type: REGISTER_PROJECT_REQUEST,
});

export const registerProjectSuccess = () => ({
  type: REGISTER_PROJECT_SUCCESS,
});

export const registerProjectFailure = (error) => ({
  type: REGISTER_PROJECT_FAILURE,
  payload: error,
});

// Action Creators to reset registration
export const resetRegistrationState = () => ({
    type: RESET_REGISTRATION_STATE,
});

