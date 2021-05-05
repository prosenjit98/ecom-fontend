import { userConstants } from "../actions/constants"

const initState = {
  address: [],
  orders: [],
  error: null,
  loading: false,
  orderFetching: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case userConstants.GET_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        loading: false,
        address: action.payload.address
      }
      break;
    case userConstants.GET_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case userConstants.CREATE_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case userConstants.CREATE_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        loading: false,
        address: action.payload.address
      }
      break;
    case userConstants.CREATE_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case userConstants.GET_USER_ORDER_REQUEST:
      state = {
        ...state,
        orderFetching: true
      }
      break;
    case userConstants.GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        orderFetching: false,
        orders: action.payload.orders
      }
      break;
    case userConstants.GET_USER_ORDER_FAILURE:
      state = {
        ...state,
        orderFetching: false,
        error: action.payload.error
      }
      break;
  }
  return state;
}