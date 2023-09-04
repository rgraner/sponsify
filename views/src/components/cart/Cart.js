import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCartItem, removeCartItem } from '../../redux/actions/cartItemActions';

function Cart( {cartItem, fetchCartItem, removeCartItem} ) {
  const { userId } = useParams();

  useEffect(() => {
    fetchCartItem(userId);
    }, [fetchCartItem, userId]);

  const handleRemoveFromCart = () => {
    removeCartItem(userId);
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItem.cartItem[0] ? (
        <div>
          <p>{cartItem.cartItem[0].name} - {cartItem.cartItem[0].price}</p>
          <button onClick={handleRemoveFromCart}>Remove from Cart</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
    cartItem: state.cartItem,
  });
  
  const mapDispatchToProps = {
    fetchCartItem, // Map the fetchCartItem action to props
    removeCartItem,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);
