/**
 * Centralized logger utility to handle application logs.
 * Logs are only active in development mode (__DEV__).
 */

const logger = {
  info: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams);
    }
  },
  warn: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn(message, ...optionalParams);
    }
  },
  error: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(message, ...optionalParams);
    }
  },
};

export {logger};
