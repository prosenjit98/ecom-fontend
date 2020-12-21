import axios from 'axios'
import { api } from '../urlConfig'

const token = localStorage.getItem('token')
console.log(token)

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
  }
})

export default axiosInstance 