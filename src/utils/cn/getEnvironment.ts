export const getIsDevelopment = (): boolean => {
  if (
    import.meta.env.VITE_API_URL_DEV ||
    window.location.host.includes('dev.')
  ) {
    return true;
  }

  return false;
};
