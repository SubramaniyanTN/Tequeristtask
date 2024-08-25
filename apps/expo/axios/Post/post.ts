import { AxiosRequestConfig } from 'axios'
import api from '../axios'

export type PostPropsType<T = any> = {
  url: string
  data?: T
  config?: AxiosRequestConfig<any>
}

const post = <TData = any, TResponse = any>({
  url,
  data,
  config,
}: PostPropsType<TData>): Promise<TResponse> => api.post(url, data, config).then((res) => res.data)

export default post
