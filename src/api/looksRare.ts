import { AxiosRequestConfig } from "axios";
import { makeRequest } from "./makeRequest"

export const getData = async (config: AxiosRequestConfig) => await makeRequest({
  method: 'get',
  url: '',
  ...config
});
