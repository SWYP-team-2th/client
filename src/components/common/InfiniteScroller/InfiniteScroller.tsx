import React from 'react';
import { useInfiniteScroller } from './hooks';
import Loading from '@/components/common/Loading';
import { cn } from '@/utils/cn';

interface InfiniteScrollerProps<T> {
  /** 무한스크롤할 데이터 배열 */
  data: T[];
  /** 각 아이템을 렌더링하는 함수 */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** 다음 페이지를 가져오는 함수 */
  fetchNextPage: () => void;
  /** 다음 페이지가 있는지 여부 */
  hasNextPage: boolean;
  /** 다음 페이지를 가져오는 중인지 여부 */
  isFetchingNextPage: boolean;
  /** 초기 로딩 상태 */
  isLoading?: boolean;
  /** 초기 로딩 시 표시할 컴포넌트 */
  initialLoadingComponent?: React.ReactNode;
  /** 추가 페이지 로딩 시 표시할 컴포넌트 */
  nextPageLoadingComponent?: React.ReactNode;
  /** 데이터가 없을 때 표시할 컴포넌트 */
  emptyComponent?: React.ReactNode;
  /** 컨테이너에 적용할 CSS 클래스 */
  className?: string;
  /** 각 아이템에 적용할 CSS 클래스 */
  itemClassName?: string;
  /**
   * Intersection Observer의 threshold 값 (0~1)
   * 0: 요소가 1px이라도 보이면 감지
   * 0.5: 요소의 50%가 보이면 감지
   * 1: 요소가 완전히 보여야 감지
   * 기본값: 0.1 (요소의 10%가 보이면 다음 페이지 로드)
   */
  threshold?: number;
  /**
   * Intersection Observer의 rootMargin 값
   * 뷰포트 경계에서 얼마나 먼 거리에서 감지할지 설정
   * 예: "100px" - 하단에서 100px 전에 감지
   * 예: "0px 0px -50px 0px" - 하단에서 50px 전에 감지
   * 기본값: "0px"
   */
  rootMargin?: string;
  /**
   * React key 생성을 위한 함수
   * 각 아이템의 고유 식별자를 반환해야 함
   * 예: (item) => item.id 또는 (item, index) => `${item.id}-${index}`
   */
  keyExtractor?: (item: T, index: number) => string | number;
}

export default function InfiniteScroller<T>({
  data,
  renderItem,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading = false,
  initialLoadingComponent = <Loading />,
  nextPageLoadingComponent = <Loading className="py-4" />,
  emptyComponent = (
    <div className="text-center text-gray-500 py-8">데이터가 없습니다.</div>
  ),
  className,
  itemClassName,
  threshold = 0.1,
  rootMargin = '0px',
  keyExtractor = (_, index) => index,
}: InfiniteScrollerProps<T>) {
  const observerRef = useInfiniteScroller({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    threshold,
    rootMargin,
  });

  if (isLoading) {
    return (
      <div
        className={cn('flex items-center justify-center min-h-64', className)}
      >
        {initialLoadingComponent}
      </div>
    );
  }

  if (data.length === 0) {
    return <div className={className}>{emptyComponent}</div>;
  }

  return (
    <div className={className}>
      {data.map((item, index) => (
        <div key={keyExtractor(item, index)} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      ))}

      {/* 무한스크롤 감지용 요소 */}
      <div ref={observerRef} style={{ height: '10px' }} />

      {/* 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-4">
          {nextPageLoadingComponent}
        </div>
      )}
    </div>
  );
}
