import { AxiosRequestConfig } from 'axios'
import api from '../axios'

export type PutPropsType<T = any> = {
  url: string
  data?: T
  config?: AxiosRequestConfig<any>
}

const put = <TData = any, TResponse = any>({
  url,
  data,
  config,
}: PutPropsType<TData>): Promise<TResponse> => api.put(url, data, config).then((res) => res.data)

export default put
