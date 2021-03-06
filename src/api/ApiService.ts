import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const ApiService = {
  apiHost: '',
  init (apiHost: string) {
    this.apiHost = apiHost
  },
  get (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return Axios.get(url, this.prepareConfig(config))
  },
  post (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return Axios.post(url, data, this.prepareConfig(config))
  },
  prepareConfig (config: AxiosRequestConfig = {}): AxiosRequestConfig {
    config.baseURL = this.apiHost + '/api'
    return config
  }
}

export default ApiService
