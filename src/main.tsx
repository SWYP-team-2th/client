import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
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

const recentErrors = new Map<string, number>();

const showErrorToast = (error: Error) => {
  const toastContext = getGlobalToastContext();
  if (!toastContext) return;

  let errorKey = '';
  let title = '';
  let description: string | undefined;

  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;
    title = apiError?.message || '알 수 없는 오류가 발생했습니다.';
    description = apiError?.subMessage || undefined;
    errorKey = `${error.response?.status}-${apiError?.errorCode || 'unknown'}`;
  } else {
    title = error.message || '오류가 발생했습니다';
    errorKey = error.message;
  }

  const now = Date.now();
  const lastShown = recentErrors.get(errorKey);

  if (lastShown && now - lastShown < 1000) {
    return;
  }

  recentErrors.set(errorKey, now);
  toastContext.showToast({
    type: 'error',
    title,
    description,
  });

  setTimeout(() => {
    recentErrors.delete(errorKey);
  }, 5000);
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: showErrorToast,
  }),
  mutationCache: new MutationCache({
    onError: showErrorToast,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
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
