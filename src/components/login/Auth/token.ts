// 토큰 저장
export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

// 토큰값 가져오기
export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

// 로그아웃 대비
export function removeAccessToken() {
  localStorage.removeItem('accessToken');
}
