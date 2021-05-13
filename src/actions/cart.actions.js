import { cartConstants } from "./constants";
import store from '../store'
import axiosInstance from "../helpers/axios";

const getCartItem = () => {
  return async dispatch => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axiosInstance.post(`/user/getCartItems`);
      console.log(res)
      if (res.status === 200) {
        const cartItems = res.data;
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems }
          });
        }
      } else {
        dispatch({ type: cartConstants.RESET_CART })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const addToCard = (product, step = 1) => {
  return async dispatch => {
    const { cart: { cartItems }, auth } = store.getState();
    // const product = action.payload.product;
    // const products = state.products
    const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + step) : 1
    cartItems[product._id] = {
      ...product,
      qty
    }
    // localStorage.setItem('cart', JSON.stringify(cartItems))

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST })
      const payload = {
        cartItems: [{
          product: product._id,
          quantity: qty
        }]
      };
      const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
      if (res.status === 201) {
        dispatch(getCartItem());
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems }
    })
  }
}

export const updateCart = () => {
  return async dispatch => {
    const { auth } = store.getState();
    const cartItems = localStorage.getItem('cart') ?
      JSON.parse(localStorage.getItem('cart')) : null;
    if (auth.authenticate) {
      localStorage.removeItem('cart');
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id
            }
          })
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
          if (res.status === 201) {
            dispatch(getCartItem())
          }
        }
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems: cartItems }
        })
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems: cartItems }
        })
      }
    }
  }
}

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_REQUEST })
      const res = await axiosInstance.post('/user/cart/removeItem', { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_SUCCESS })
        dispatch(getCartItem())
      } else {
        const { error } = res.data;
        dispatch({ type: cartConstants.REMOVE_CART_FAILURE, payload: error })
      }
    }
    catch (error) {
      dispatch({ type: cartConstants.REMOVE_CART_FAILURE, payload: error })
    }
  }
}

export { getCartItem }