export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export function getAccessToken(): string | null {
  const token = localStorage.getItem('accessToken');

  return token;
}

export function removeAccessToken() {
  localStorage.removeItem('accessToken');
}
