import { productConstants } from "../actions/constants"

const initState = {
  products: [],
  priceRange: {},
  productsByPrice: {},
  pageRequest: false,
  page: {},
  productDetails: null,
  loding: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        priceRange: action.payload.priceRange,
        productsByPrice: {
          ...action.payload.productByPrice
        }
      }
      break;
    case productConstants.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true
      }
      break
    case productConstants.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        pageRequest: false,
        page: action.payload
      }
      break;
    case productConstants.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        page: {},
        pageRequest: false
      }
      break;
    case productConstants.GET_PRODUCT_PAGE_BY_ID_REQUEST:
      state = {
        ...state,
        pageRequest: true
      }
      break
    case productConstants.GET_PRODUCT_PAGE_BY_ID_SUCCESS:
      state = {
        ...state,
        pageRequest: false,
        productDetails: action.payload
      }
      break;
    case productConstants.GET_PRODUCT_PAGE_BY_ID_FAILURE:
      state = {
        ...state,
        productDetails: {},
        pageRequest: false
      }
      break;
  }
  return state
}