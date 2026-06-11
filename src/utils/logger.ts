/**
 * Centralized logger utility to handle application logs.
 * Logs are only active in development mode (__DEV__).
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: any;
}

const formatLog = (
  level: LogLevel,
  message: string,
  ...optionalParams: any[]
): LogEntry => {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context:
      optionalParams.length > 0
        ? optionalParams.length === 1
          ? optionalParams[0]
          : optionalParams
        : undefined,
  };
};

const logger = {
  info: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      const entry = formatLog('INFO', message, ...optionalParams);
      console.log(
        `[${entry.timestamp}] [${entry.level}] ${entry.message}`,
        entry.context !== undefined ? entry.context : '',
      );
    }
  },
  warn: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      const entry = formatLog('WARN', message, ...optionalParams);
      console.warn(
        `[${entry.timestamp}] [${entry.level}] ${entry.message}`,
        entry.context !== undefined ? entry.context : '',
      );
    }
  },
  error: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      const entry = formatLog('ERROR', message, ...optionalParams);
      console.error(
        `[${entry.timestamp}] [${entry.level}] ${entry.message}`,
        entry.context !== undefined ? entry.context : '',
      );
    }
  },
};

export {logger};
