import {
    REGISTER_SPONSOR_REQUEST,
    REGISTER_SPONSOR_SUCCESS,
    REGISTER_SPONSOR_FAILURE,
    RESET_REGISTRATION_STATE
  } from '../actions/registrationActions';
  
  // Define the initial state for registration
  const initialState = {
    isLoading: false, // Indicates if a registration request is in progress
    Success: false, // Indicates if registration was successful
    error: null, // Stores any registration error message
  };
  
  // Registration reducer
  const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_SPONSOR_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: false,
          error: null,
        };
  
      case REGISTER_SPONSOR_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: true,
          error: null,
        };
  
      case REGISTER_SPONSOR_FAILURE:
        return {
          ...state,
          isLoading: false,
          success: false,
          error: action.payload,
        };
      
      case RESET_REGISTRATION_STATE:
        return {
          ...initialState,
        };
  
      default:
        return state;
    }
  };
  
  export default registrationReducer;
  