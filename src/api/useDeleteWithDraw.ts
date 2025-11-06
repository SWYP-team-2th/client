import { useMutation } from '@tanstack/react-query';
import { request } from './config';

export default function useDeleteWithDraw() {
  return useMutation({
    mutationFn: () =>
      request({
        method: 'DELETE',
        url: '/auth/withdraw',
      }),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      window.location.href = '/onboarding';
    },
  });
}
