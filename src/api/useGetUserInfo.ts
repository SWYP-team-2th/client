import { useSuspenseQuery } from '@tanstack/react-query';
import { request } from './config';

export interface UserInfoType {
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
      }),
    queryKey: ['user', userId],
  });
}
