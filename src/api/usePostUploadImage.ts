import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

interface UploadImageResponse {
  imageFileId: number[];
}

export default function usePostUploadImage(
  options?: Omit<
    UseMutationOptions<UploadImageResponse, Error, FormData>,
    'mutationFn'
  >,
) {
  return useMutation<UploadImageResponse, Error, FormData>({
    mutationFn: (formData: FormData) =>
      request({
        method: 'POST',
        url: '/image/upload',
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
        },
        data: formData,
      }),
    ...options,
  });
}
