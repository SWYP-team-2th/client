import { useMutation } from '@tanstack/react-query';
import { request } from './config';

export default function usePostUploadImage() {
  return useMutation({
    mutationFn: (formData: FormData) =>
      request({
        method: 'POST',
        url: '/image/upload',
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJpYXQiOjE3NDAyOTQyMzEsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjMzMjc2Mjk0MjMxfQ.gqA245tRiBQB9owKRWIpX1we1T362R-xDTt4YT9AhRY`,
        },
        data: formData,
      }),
  });
}
