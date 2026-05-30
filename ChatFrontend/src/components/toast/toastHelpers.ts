export const getToastErrorMessage = (error: any, fallbackMessage: string) => {
  return error.response.data.message || fallbackMessage;
};
