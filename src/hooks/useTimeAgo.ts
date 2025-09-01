import { useMemo } from 'react';

// TODO: getTimeRemainingText로 변경하고 제거
export function useTimeAgo(dateString: string) {
  return useMemo(() => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  }, [dateString]);
}
