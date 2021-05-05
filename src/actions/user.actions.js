import axiosInstance from "../helpers/axios"
import { cartConstants, userConstants } from "./constants";

export const getUserAddress = () => {
  return async dispatch => {
    try {
      const res = await axiosInstance.post('/user/getuseraddress');
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST })
      if (res.status === 200) {
        const { userAddress: { address } } = res.data
        dispatch({ type: userConstants.GET_USER_ADDRESS_SUCCESS, payload: { address } });
      }
      else {
        const { error } = res.data
        dispatch({ type: userConstants.GET_USER_ADDRESS_FAILURE, payload: { error } })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const addUserAddress = (payload) => {
  console.log(payload);
  return async dispatch => {
    try {
      const res = await axiosInstance.post('/user/address/create', { payload });
      console.log(res.data.address);
      dispatch({ type: userConstants.CREATE_USER_ADDRESS_REQUEST })
      if (res.status === 201) {
        const { address: { address } } = res.data
        dispatch({ type: userConstants.CREATE_USER_ADDRESS_SUCCESS, payload: { address } });
      }
      else {
        const { error } = res.data
        dispatch({ type: userConstants.CREATE_USER_ADDRESS_FAILURE, payload: { error } })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const addUserOrder = (payload) => {
  return async dispatch => {
    try {
      const res = await axiosInstance.post('/user/create_order', payload);
      console.log(res.data.order);
      dispatch({ type: userConstants.CREATE_USER_ORDER_REQUEST })
      if (res.status === 201) {
        const { order } = res.data
        dispatch({ type: cartConstants.RESET_CART })
        // dispatch({
        //   type: userConstants.CREATE_USER_ORDER_SUCCESS,
        //   // payload: { address } 
        // });
      }
      else {
        const { error } = res.data
        dispatch({ type: userConstants.CREATE_USER_ORDER_FAILURE, payload: { error } })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getOrder = () => {
  return async dispatch => {
    try {
      const res = await axiosInstance.get('/user/orders');
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST })
      if (res.status === 200) {
        const { orders } = res.data
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders }
        });
      }
      else {
        const { error } = res.data
        dispatch({ type: userConstants.GET_USER_ORDER_FAILURE, payload: { error } })
      }
    } catch (error) {
      console.log(error)
    }
  }
}