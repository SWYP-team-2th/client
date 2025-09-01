interface GetRemainedTimeTextOptions {
  dateString: string;
  suffix: string;
}

export const getRemainedTimeText = ({
  dateString,
  suffix,
}: GetRemainedTimeTextOptions) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 ${suffix}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 ${suffix}`;
  return `${Math.floor(diff / 86400)}일 ${suffix}`;
};
