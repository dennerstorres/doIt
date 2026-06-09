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
  });

  afterEach(() => {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  });

  it('should call console.log when __DEV__ is true', () => {
    logger.info('test info');
    expect(console.log).toHaveBeenCalledWith('test info');
  });

  it('should call console.warn when __DEV__ is true', () => {
    logger.warn('test warn');
    expect(console.warn).toHaveBeenCalledWith('test warn');
  });

  it('should call console.error when __DEV__ is true', () => {
    logger.error('test error');
    expect(console.error).toHaveBeenCalledWith('test error');
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

  it('should handle multiple optional parameters', () => {
    const data = {id: 1};
    logger.info('data:', data);
    expect(console.log).toHaveBeenCalledWith('data:', data);
  });
});
