import axios from 'axios'
import { baseURL } from '../Utils'

export const apiInstance = axios.create({
  baseURL: baseURL,
})
