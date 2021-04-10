import axiosInstance from "../helpers/axios"
import { productConstants } from "./constants"

export const getProductBySlug = (slug) => {
  return async dispatch => {
    const res = await axiosInstance.get(`/products/${slug}`)
    if (res.status === 200)
      dispatch({ type: productConstants.GET_PRODUCT_BY_SLUG, payload: res.data })
  }
}

export const getProductPage = (payload) => {
  return async dispatch => {
    try {
      const { cid, type } = payload
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST })
      const res = await axiosInstance.get(`/page/${cid}/${type}`);
      if (res.status === 200)
        dispatch({ type: productConstants.GET_PRODUCT_PAGE_SUCCESS, payload: res.data })
      else {
        dispatch({ type: productConstants.GET_PRODUCT_PAGE_FAILURE })
      }
    } catch {
      // console.log(error)
    }

  }
}
export const getProductDetailsById = (payload) => {
  return async dispatch => {
    try {
      console.log(payload.params);
      const { productId, type } = payload.params
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_BY_ID_REQUEST })
      const res = await axiosInstance.get(`/product/${productId}`);
      if (res.status === 200)
        dispatch({ type: productConstants.GET_PRODUCT_PAGE_BY_ID_SUCCESS, payload: res.data })
      else {
        dispatch({ type: productConstants.GET_PRODUCT_PAGE_BY_ID_FAILURE })
      }
    } catch {
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_BY_ID_FAILURE })
    }

  }
}