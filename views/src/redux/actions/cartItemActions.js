// Action types
export const FETCH_CART_ITEM_SUCCESS = 'FETCH_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';

// Action creators
export const fetchCartItemSuccess = (cartItem) => ({
  type: FETCH_CART_ITEM_SUCCESS,
  payload: cartItem,
});

export const removeCartItemSuccess = () => ({
  type: REMOVE_CART_ITEM_SUCCESS,
});

// Fetch cart item based on the user's ID
export const fetchCartItem = (userId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`/api/cart/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch the cart item');
            }

            const cartItem = await response.json();
            // Dispatch the success action with the fetched cart item
            dispatch(fetchCartItemSuccess(cartItem));
        } catch (error) {
            console.error(`Error fecthing cart item:, ${error}`);
            // Dispatch an error action here if needed
        }
    };
};

// Remove the cart item
export const removeCartItem = (userId) => {
    return async (dispatch) => {
        try{
            console.log("Removing cart item for user:", userId);
            const response = await fetch(`/api/cart/user/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove the cart item');
            }

            // Dispatch the success action to indicate the plan was removed
            dispatch(removeCartItemSuccess());
        } catch (error) {
            console.error(`Error removing cart item:, ${error}`);
            // Dispatch an error action here if needed
        }
    };
};