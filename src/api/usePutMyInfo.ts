import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

export interface PutMyInfoRequest {
  nickname: string;
  profileImageUrl: string;
}

export default function usePutMyInfo(
  options?: Omit<
    UseMutationOptions<PutMyInfoRequest, Error, PutMyInfoRequest>,
    'mutationFn'
  >,
) {
  return useMutation<PutMyInfoRequest, Error, PutMyInfoRequest>({
    mutationFn: (data) =>
      request({
        method: 'PUT',
        url: '/users/me',
        data,
      }),
    ...options,
  });
}
