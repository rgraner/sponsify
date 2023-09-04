import {
    FETCH_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_SUCCESS
} from '../actions/cartActions';

const initialState = {
    cartItem: [],
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CART_ITEM_SUCCESS:
            return action.payload

        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                cartItem: [],
            };
        default:
            return state
    }
};

export default cartReducer;