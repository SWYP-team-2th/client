export const getIsDevelopment = (): boolean => {
  return (
    window.location.origin.includes('dev.') ||
    window.location.origin.includes('localhost')
  );
};
