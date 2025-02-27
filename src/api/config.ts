import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD,
  validateStatus: (status) => status >= 200 && status < 300,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {
  const accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJpYXQiOjE3NDAyOTQyMzEsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjMzMjc2Mjk0MjMxfQ.gqA245tRiBQB9owKRWIpX1we1T362R-xDTt4YT9AhRY'; // 임시 토큰

  // ✅ AxiosHeaders 객체로 헤더 설정
  if (config.headers instanceof AxiosHeaders) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  } else {
    config.headers = new AxiosHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('응답 에러:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('요청 에러:', error.request);
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
