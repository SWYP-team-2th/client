import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

interface GuestLoginResponseType {
  accessToken: string;
  userId: number;
  role: 'USER' | 'GUEST';
}

export default function usePostGuestLogin(
  options?: UseMutationOptions<GuestLoginResponseType, Error, void>,
) {
  return useMutation<GuestLoginResponseType, Error, void>({
    mutationFn: () => {
      return request<GuestLoginResponseType>({
        method: 'POST',
        url: '/auth/guest/sign-in',
      });
    },
    ...options,
  });
}
