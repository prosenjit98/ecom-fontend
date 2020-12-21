import axiosInstance from "../helpers/axios"
import { categoryConstants } from "./constants"

export const getAllCategory = () => {
  return async dispatch => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST })
    const res = await axiosInstance.get('/category/getcategories')
    if (res.status === 200) {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORY_SUCCESS, payload: res.data })
    }
    else {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORY_FAILURE, payload: res.data.error })
    }
  }
}
