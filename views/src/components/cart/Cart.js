import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCartItem } from '../../redux/actions/cartActions';

function Cart( {cartItem, fetchCartItem} ) {
    const { userId } = useParams();
    console.log('userId:', userId)

    useEffect(() => {
      fetchCartItem(userId);
      }, [fetchCartItem, userId]);


  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItem[0] ? (
        <div>
          <p>{cartItem[0].name} - {cartItem[0].price}</p>
          <button>Remove from Cart</button>
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
    fetchCartItem, // Map the fetchCartPlan action to props
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);
