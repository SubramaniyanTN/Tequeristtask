import axios from 'axios'
import { baseURL } from '../Utils'

const api = axios.create({
  baseURL: baseURL,
})

export default api
