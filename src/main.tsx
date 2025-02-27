import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { BottomSheetProvider } from '@/components/common/BottomSheet/BottomSheetProvider.tsx';
import { DialogProvider } from '@/components/common/Dialog/DialogProvider.tsx';
import ToastProvider from '@/components/common/Toast/ToastProvider';
import { router } from '@/routes/routing.tsx';
import './index.css';

const queryClient = new QueryClient({
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
        <BottomSheetProvider>
          <ToastProvider>
            <DialogProvider>
              <RouterProvider router={router} />
            </DialogProvider>
          </ToastProvider>
        </BottomSheetProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
});
