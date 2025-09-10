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

  // 투표 및 댓글 생성 시에 업로드 후 시간 표시
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 ${suffix}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 ${suffix}`;
  return `${Math.floor(diff / 86400)}일 ${suffix}`;
};

export const getDeadlineText = (deadlineString: string) => {
  const now = new Date();
  const deadline = new Date(deadlineString);
  const diff = (deadline.getTime() - now.getTime()) / 1000;

  // 투표 마감 설정 시에 남은 시간 표시
  if (diff < 60) return `${Math.floor(diff)}초 남음`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)}분 ${Math.floor(diff % 60)}초 남음`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)}시간 ${Math.floor((diff % 3600) / 60)}분 남음`;
  return `${Math.floor(diff / 86400)}일 ${Math.floor((diff % 86400) / 3600)}시간 남음`;
};
