import { useSuspenseQuery } from '@tanstack/react-query';
import { request } from './config';

export interface UserInfoType {
  id: number;
  nickname: string;
  notification: boolean;
  onboardingStep: {
    FIRST_VOTE: boolean;
    WELCOME_GUIDE: boolean;
  };
  profileImageUrl: string;
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
