import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

interface UploadImageRequest {
  contentType: string;
  contentLength: number;
}

interface UploadImageResponse {
  signedUploadPutUrl: string;
  signedGetUrl: string;
  assetUrl: string;
}

interface PutImageToS3Request {
  url: string;
  data: File;
}

export function usePostUploadImageV2(
  options?: Omit<
    UseMutationOptions<UploadImageResponse, Error, UploadImageRequest>,
    'mutationFn'
  >,
) {
  return useMutation<UploadImageResponse, Error, UploadImageRequest>({
    mutationFn: (data: UploadImageRequest) =>
      request({
        method: 'POST',
        url: '/image/upload',
        data,
      }),
    ...options,
  });
}

export function usePutImageToS3(
  options?: Omit<
    UseMutationOptions<void, Error, PutImageToS3Request>,
    'mutationFn'
  >,
) {
  return useMutation<void, Error, PutImageToS3Request>({
    mutationFn: async (data: PutImageToS3Request) => {
      const response = await fetch(data.url, {
        method: 'PUT',
        headers: {
          'Content-Type': data.data.type,
        },
        body: data.data,
      });

      if (!response.ok) {
        throw new Error(`S3 업로드 실패: ${response.status}`);
      }
    },
    ...options,
  });
}

export function useUploadImage() {
  const { mutateAsync: getPresignedUrl, isPending: isGettingUrl } =
    usePostUploadImageV2();
  const { mutateAsync: putImageToS3, isPending: isPuttingToS3 } =
    usePutImageToS3();

  const uploadImage = async (file: File) => {
    const presignedUrlData = await getPresignedUrl({
      contentType: file.type,
      contentLength: file.size,
    });

    await putImageToS3({
      url: presignedUrlData.signedUploadPutUrl,
      data: file,
    });

    return presignedUrlData.signedGetUrl;
  };

  const isUploading = isGettingUrl || isPuttingToS3;

  return { uploadImage, isUploading };
}
