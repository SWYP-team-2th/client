import { useMutation } from '@tanstack/react-query';
import { request } from './config';

export default function usePostLogout() {
  return useMutation({
    mutationFn: () =>
      request({
        method: 'POST',
        url: '/auth/sign-out',
      }),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      window.location.href = '/onboarding';
    },
  });
}
