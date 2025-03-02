export const getIsDevelopment = (): boolean => {
  if (import.meta.env.PROD) {
    return false;
  }

  return true;
};
