import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/authenticationActions";

const initialState = {
    isLoggedIn: false,
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authenticationReducer;

