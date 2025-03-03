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

export function getRole(): 'USER' | 'GUEST' | null {
  const role = localStorage.getItem('role');

  return role as 'USER' | 'GUEST' | null;
}

export function setRole(role: 'USER' | 'GUEST') {
  localStorage.setItem('role', role);
}

export function removeRole() {
  localStorage.removeItem('role');
}
