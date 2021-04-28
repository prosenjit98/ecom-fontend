import axios from 'axios'
import { api } from '../urlConfig'
import store from '../store'
import { authConstants } from "../actions/constants"


const token = localStorage.getItem('token')
console.log(token)

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
  }
})

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`
  }
  return req;
})

axiosInstance.interceptors.response.use((response) => {
  return response
},
  function (error) {
    console.log(error)
    if (error.response.status === 401) {
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS })
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  })

export default axiosInstance