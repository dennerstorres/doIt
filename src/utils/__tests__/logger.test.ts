import {logger} from '../logger';

describe('Logger Utility', () => {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  beforeEach(() => {
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
    // @ts-ignore
    global.__DEV__ = true;
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2023-01-01T12:00:00Z'));
  });

  afterEach(() => {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    jest.useRealTimers();
  });

  it('should call console.log with structured format when __DEV__ is true', () => {
    logger.info('test info');
    expect(console.log).toHaveBeenCalledWith(
      '[2023-01-01T12:00:00.000Z] [INFO] test info',
      '',
    );
  });

  it('should call console.warn with structured format when __DEV__ is true', () => {
    logger.warn('test warn');
    expect(console.warn).toHaveBeenCalledWith(
      '[2023-01-01T12:00:00.000Z] [WARN] test warn',
      '',
    );
  });

  it('should call console.error with structured format when __DEV__ is true', () => {
    logger.error('test error');
    expect(console.error).toHaveBeenCalledWith(
      '[2023-01-01T12:00:00.000Z] [ERROR] test error',
      '',
    );
  });

  it('should NOT call console methods when __DEV__ is false', () => {
    // @ts-ignore
    global.__DEV__ = false;

    logger.info('test info');
    logger.warn('test warn');
    logger.error('test error');

    expect(console.log).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should handle single optional parameter as context', () => {
    const data = {id: 1};
    logger.info('data:', data);
    expect(console.log).toHaveBeenCalledWith(
      '[2023-01-01T12:00:00.000Z] [INFO] data:',
      data,
    );
  });

  it('should handle multiple optional parameters as context array', () => {
    logger.info('multiple:', 1, 'two', {three: 3});
    expect(
      console.log,
    ).toHaveBeenCalledWith('[2023-01-01T12:00:00.000Z] [INFO] multiple:', [
      1,
      'two',
      {three: 3},
    ]);
  });
});
