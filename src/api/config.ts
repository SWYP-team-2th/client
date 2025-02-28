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

// 찬영 로직의 문제
// 1. axiosInstance.interceptors 로직이 2개로 분리됨
// 2. errorMessage 참조가 잘못됨
// console.error로 로깅 디버깅하기!!!

// 상황
// 토큰 없이 POST 요청 시 -> 401 + INVALID_AUTH_HEADER
// 만료된 토큰으로 POST 요청 시 -> 401

// 400, 401 서버에서 구분이 안됨
// 1. 토큰 없는 경우 (게스트)
// 2. 만료된 토큰으로 요청하는 경우 (회원)

// 로직 작성한다.
//

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error.response);
    // 토큰 없는 경우 -> 400 + INVALID_GUEST_HEADER
    if (
      error.response?.status === 400 &&
      error.response.data?.errorCode === 'INVALID_GUEST_HEADER'
    ) {
      try {
        const newGuestToken = await fetchGuestToken();
        error.config.headers['Guest-Token'] = newGuestToken;
        return axios(error.config);
      } catch (err) {
        console.error('게스트 토큰 재발급 실패:', err);
      }
    }

    // 토큰이 있는 경우
    if (
      error.response?.status === 401 &&
      error.config &&
      // refresh token 요청은 헤더에 accessToken이 있는 경우에만 한다.
      error.config.headers.Authorization
    ) {
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
