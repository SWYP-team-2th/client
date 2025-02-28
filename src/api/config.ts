import axios, { AxiosRequestConfig } from 'axios';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getGuestToken,
  setGuestToken,
} from '@/components/login/Auth/token';

const isDevelopment =
  import.meta.env.VITE_API_URL_DEV || window.location.host.includes('dev.');

const axiosConfig: AxiosRequestConfig = {
  baseURL: isDevelopment
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD,
  validateStatus: (status) => status >= 200 && status < 300,
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

// 요청시 localStorage에서 헤더에 유저, 게스트 토큰 넣어줌
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const guestToken = getGuestToken();
  if (guestToken) {
    config.headers['Guest-Token'] = guestToken;
  }

  return config;
});

// 게스트 토큰 발급 함수
const fetchGuestToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.post<{ guestToken: string }>(
      '/auth/guest/token',
    );

    // 반환된 응답 데이터가 있으면
    if (response.data?.guestToken) {
      setGuestToken(response.data.guestToken); // 게스트 토큰 저장
      console.log('게스트 토큰 발급 성공:', response.data.guestToken);
      return response.data.guestToken;
    }

    // 반환된 응답 값 없으면 null 반환
    return null;
  } catch (error) {
    console.error('게스트 토큰 발급 실패:', error);
    return null;
  }
};

// 토큰 재발급 함수
const fetchReissueToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.post<{ accessToken: string }>(
      '/auth/reissue',
      null,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    // 반환된 응답 데이터가 있으면
    if (response.data?.accessToken) {
      // accessToken 저장 (재발급 성공)
      setAccessToken(response.data.accessToken);
      console.log('토큰 재발급 성공:', response.data.accessToken);
      return response.data.accessToken;
    }
    // 반환된 응답 값 없으면 null 반환시킴
    return null;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    return null;
  }
};

// 응답 인터셉터
// 401이면 토큰 재발급 API('/auth/reissue')를 호출
// 재발급 성공 시 새 토큰으로 다시 요청
// 실패 시 토큰 삭제 후 '/onboarding' 이동

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config) {
      try {
        const newAccessToken = await fetchReissueToken(); // 401 에러시 새로운 토큰 요청

        // 새로운 토큰 들어오면 새로운 토큰으로 다시 저장시키기
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config); // 재요청
        }
      } catch (err) {
        // 토큰 재발급 실패 시 로그아웃 후 온보딩 페이지로 이동
        console.error('401시 토큰 재발급 중 오류:', err);
        removeAccessToken();
        window.location.href = '/onboarding';
      }
    }

    return Promise.reject(error);
  },
);

// 게스트
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 400 처리 (게스트 토큰 없음)
    if (
      error.response?.status === 400 &&
      error.response.data?.error === 'INVALID_GUEST_HEADER'
    ) {
      try {
        const newGuestToken = await fetchGuestToken();
        error.config.headers['Guest-Token'] = newGuestToken;
        return axiosInstance(error.config);
      } catch (err) {
        console.error('게스트 토큰 재발급 실패:', err);
      }
    }
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
