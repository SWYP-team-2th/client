export const validateTitle = (title: string) => {
  if (title.length === 0) return '제목을 입력해주세요.';
  if (title.length > 50) return '제목은 50자 이내여야 합니다.';
  return null;
};

export const validateDescription = (description: string) => {
  if (description.length === 0) return '내용을 입력해주세요.';
  if (description.length > 1000) return '내용은 1000자 이내여야 합니다.';
  return null;
};
