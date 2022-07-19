import { AxiosRequestConfig } from 'axios';
import { makeCrowdApiRequest as makeRequest } from './makeRequest';

const API_PARAM = 'crowd';

export const getCrowds = async (config: AxiosRequestConfig) => {
  return await makeRequest<ApiResponse<CrowdApiType>>({
    method: 'get',
    url: API_PARAM,
    withCredentials: false,
    ...config
  })
};

export const getCrowd = async (config: AxiosRequestConfig) => {
  return await makeRequest<CrowdApiType>({
    method: 'get',
    url: API_PARAM,
    withCredentials: false,
    ...config
  })
};

export const getCrowdPreview = async (config: AxiosRequestConfig) => {
  return await makeRequest<PreviewApiType>(
    {
      method: 'get',
      url: `${API_PARAM}/preview`,
      withCredentials: false,
      ...config
    }
  );
};

export const createCrowd = async (data: CreateCrowdData) => {
  return await makeRequest<CreateCrowdResponse>(
    {
      method: 'post',
      url: `${API_PARAM}/new`,
      data
    }
  );
};
