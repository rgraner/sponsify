// Action Types
export const REGISTER_SPONSOR_REQUEST = 'REGISTER_SPONSOR_REQUEST';
export const REGISTER_SPONSOR_SUCCESS = 'REGISTER_SPONSOR_SUCCESS';
export const REGISTER_SPONSOR_FAILURE = 'REGISTER_SPONSOR_FAILURE';
export const RESET_REGISTRATION_STATE = 'RESET_REGISTRATION_STATE';

// Action Creators

// Action to initiate the sponsor registration request
export const registerSponsorRequest = () => ({
  type: REGISTER_SPONSOR_REQUEST,
});

// Action to handle successful sponsor registration
export const registerSponsorSuccess = () => ({
  type: REGISTER_SPONSOR_SUCCESS,
});

// Action to reset sponsor registration
export const resetRegistrationState = () => ({
    type: RESET_REGISTRATION_STATE,
  });

// Action to handle failed sponsor registration
export const registerSponsorFailure = (error) => ({
  type: REGISTER_SPONSOR_FAILURE,
  payload: error,
});
