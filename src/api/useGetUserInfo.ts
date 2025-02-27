import { useSuspenseQuery } from '@tanstack/react-query';
import { request } from './config';

interface UserInfoType {
  id: number;
  nickname: string;
  profileUrl: string;
}

export default function useGetUserInfo(userId: number) {
  return useSuspenseQuery<UserInfoType>({
    queryFn: () =>
      request({
        method: 'GET',
        url: `/users/${userId}`,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMiLCJpYXQiOjE3NDA2Mzg1MzQsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjM4MTQyMzg1MzR9.CcTPwu-kthkfSqcAfA2N1wth77kbbOUe0Ama0P6SdTs`,
        },
      }),
    queryKey: ['user', userId],
  });
}
