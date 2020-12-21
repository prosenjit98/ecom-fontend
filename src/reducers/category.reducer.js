import { categoryConstants } from "../actions/constants"

const initState = {
  loading: false,
  categories: [],
  error: null,
  message: ''
}
export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      state = {
        ...state,
        categories: action.payload,
        loading: false
      }
      break
    case categoryConstants.GET_ALL_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: "Category created successfully"
      }
      break
  }
  return state
}