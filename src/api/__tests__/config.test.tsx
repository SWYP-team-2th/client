/**
 * @vitest-environment jsdom
 */
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { request } from '../config';

const mockRequest = vi.fn();
vi.mock('../config', () => ({
  request: (...args: any[]) => mockRequest(...args),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CreateProductRequest {
  name: string;
  price: number;
}

describe('test request(): useQuery의 queryFn 혹은 useMutation의 mutationFn 인자로 전달하는 함수', () => {
  it('request 함수는 useQuery의 queryFn 인자로 전달된다,', async () => {
    // when
    const products: Product[] = [
      { id: 1, name: '상품 1', price: 1000 },
      { id: 2, name: '상품 2', price: 2000 },
      { id: 3, name: '상품 3', price: 3000 },
    ];

    mockRequest.mockResolvedValue(products);

    const useProducts = () => {
      return useQuery({
        queryKey: ['products'],
        queryFn: () =>
          request({
            method: 'GET',
            url: '/products',
          }),
      });
    };

    // given
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    // then
    await waitFor(async () => {
      expect(result.current.data).toEqual(products);
    });
  });

  it('request 함수는 useMutation의 mutationFn 인자로 전달된다,', async () => {
    // when
    const newProduct: CreateProductRequest = {
      name: '새 상품',
      price: 15000,
    };

    const createdProduct: Product = {
      id: 4,
      ...newProduct,
    };

    mockRequest.mockResolvedValue(createdProduct);

    const useCreateProduct = () => {
      return useMutation({
        mutationFn: (data: CreateProductRequest) =>
          request({
            method: 'POST',
            url: '/products',
            data,
          }),
      });
    };

    // given
    const { result } = renderHook(() => useCreateProduct(), {
      wrapper: createWrapper(),
    });

    // then
    result.current.mutate(newProduct);

    await waitFor(() => {
      expect(result.current.data).toEqual(createdProduct);
    });
  });
});
