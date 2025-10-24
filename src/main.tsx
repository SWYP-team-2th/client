import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApiError } from '@/api/config';
import { BottomSheetProvider } from '@/components/common/BottomSheet/BottomSheetProvider.tsx';
import { DialogProvider } from '@/components/common/Dialog/DialogProvider.tsx';
import ToastProvider, {
  getGlobalToastContext,
} from '@/components/common/Toast/ToastProvider';
import { router } from '@/routes/routing.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError: (error: Error) => {
        const toastContext = getGlobalToastContext();
        if (toastContext) {
          if (error instanceof AxiosError) {
            const apiError = error.response?.data as ApiError;
            toastContext.showToast({
              type: 'error',
              title: apiError?.errorCode || '알 수 없는 오류가 발생했습니다.',
              description:
                apiError?.message || '알 수 없는 오류가 발생했습니다.',
            });
          } else {
            toastContext.showToast({
              type: 'error',
              title: '오류가 발생했습니다',
              description: error.message || '알 수 없는 오류가 발생했습니다.',
            });
          }
        }
      },
    },
  },
});

async function prepareMSW() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser.ts');

    await worker.start();
    console.log('MSW 정상적으로 동작중!');
  }
}

prepareMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BottomSheetProvider>
            <DialogProvider>
              <RouterProvider router={router} />
            </DialogProvider>
          </BottomSheetProvider>
        </ToastProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
});
