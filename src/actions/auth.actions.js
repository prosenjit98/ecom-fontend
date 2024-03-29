import axiosInstance from "../helpers/axios"
import { authConstants, cartConstants } from "./constants"

export const login = (user) => {

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST })
    const res = await axiosInstance.post(`/signin`, {
      ...user
    })

    if (res.status === 200) {
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } })
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE, payload: { error: res.data.error }
        })
      }
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } })
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: 'Failed to loged in' }
      })
    }
  }
}

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST })
    // const res = await axiosInstance.post('/signout')
    // if (res.status === 200) {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    localStorage.clear()
    dispatch({ type: authConstants.LOGOUT_SUCCESS })
    dispatch({ type: cartConstants.RESET_CART })
    // } else {
    //   dispatch({
    //     type: authConstants.LOGOUT_FAILURE,
    //     payload: res.data.error
    //   })
    // }

  }
}

export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      const res = await axiosInstance.post('/signup', user);
      if (res.status === 201) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS })
        const { token, user } = res.data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS, payload: { token, user }
        })
      }
      else {
        dispatch({ type: authConstants.SIGNUP_FAILURE })
      }
    }
    catch (error) {
      dispatch({ type: authConstants.SIGNUP_FAILURE })
    }
  }
}
