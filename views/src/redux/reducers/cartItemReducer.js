import {
    FETCH_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_SUCCESS
} from '../actions/cartItemActions';

const initialState = {
    cartItem: [],
};

const cartItemReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CART_ITEM_SUCCESS:
            return {
                ...state,
                cartItem: action.payload,
            };

        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                cartItem: [],
            };
        default:
            return state
    }
};

export default cartItemReducer;