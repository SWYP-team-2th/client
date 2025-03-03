import axios, { AxiosRequestConfig } from 'axios';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from '@/components/login/Auth/token';
import { getIsDevelopment } from '@/utils/cn/getEnvironment';

const isDevelopment = getIsDevelopment();

const axiosConfig: AxiosRequestConfig = {
  baseURL: isDevelopment
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD,
  validateStatus: (status) => status >= 200 && status < 300,
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const reissueToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.post<{ accessToken: string }>(
      '/auth/reissue',
      null,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    }

    return null;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    return null;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config) {
      try {
        const newAccessToken = await reissueToken();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (err) {
        console.error('401시 토큰 재발급 중 오류:', err);
        removeAccessToken();
        window.location.href = '/onboarding';
      }
    }

    if (
      error.response?.status === 400 &&
      error.response.data.errorCode === 'INVALID_GUEST_HEADER'
    ) {
      try {
        const response = await axiosInstance.post<{ guestToken: string }>(
          '/auth/guest/token',
          null,
        );

        if (response.data.guestToken) {
          localStorage.setItem('guestToken', response.data.guestToken);
          error.config.headers['Guest-Token'] = response.data.guestToken;
          return axios(error.config);
        }
      } catch (err) {
        console.error('400시 게스트 토큰 발급 중 오류:', err);
        removeAccessToken();
        window.location.href = '/onboarding';
      }
    }

    return Promise.reject(error);
  },
);

interface RequestConfig extends AxiosRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  params?: AxiosRequestConfig['params'];
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
}

const request = async <T>(config: RequestConfig): Promise<T> => {
  const { data } = await axiosInstance.request<T>({
    ...config,
  });
  return data;
};

export { request };
