// 토큰 저장
export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
  console.log('토큰 저장됨');
}

// 유저 아이디 저장
export function setAccessTokenUserId(userId: string) {
  localStorage.setItem('userId', userId);
  console.log('토큰 저장됨');
}

// 토큰값 가져오기
export function getAccessToken(): string | null {
  const token = localStorage.getItem('accessToken');

  console.log('가져온 토큰', token);
  return token;
}

// 로그아웃 대비
export function removeAccessToken() {
  localStorage.removeItem('accessToken');
  console.log('토큰 삭제 됨');
}
