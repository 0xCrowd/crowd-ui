import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const NEW_API_ENDPOINT = "https://crowd-api-e43tw.ondigitalocean.app";

export const makeRequest = <T>(config: AxiosRequestConfig): AxiosPromise<T> => axios(config);

export const makeCrowdApiRequest = <T>(config: AxiosRequestConfig): AxiosPromise<T> => {
  config.url = `${NEW_API_ENDPOINT}/${config.url}`;

  return makeRequest(config);
}
