import React, { useState } from 'react';
import { addToCart, removeOneFromCart } from '../../util/cart_api_util';
import { receiveCart } from '../../actions/cart_actions';
import { useDispatch } from 'react-redux';

const CartMinusButton = (props) => {
  const dispatch = useDispatch();

  const { petId } = props;

  const handleRemovePetQty = async (e) => {
    e.preventDefault();
    let newCart = await removeOneFromCart(petId);
    dispatch(receiveCart(newCart.data));
  };

  return (
    <span onClick={handleRemovePetQty}>-</span>
  )
};

export default CartMinusButton;