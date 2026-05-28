export const getToastErrorMessage = (
  error: unknown,
  fallbackMessage: string,
) => {
  return error instanceof Error ? error.message : fallbackMessage;
};
