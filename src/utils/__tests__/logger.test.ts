import {logger} from '../logger';

describe('logger utility', () => {
  const originalDev = __DEV__;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // @ts-ignore
    global.__DEV__ = originalDev;
  });

  describe('when __DEV__ is true', () => {
    beforeEach(() => {
      // @ts-ignore
      global.__DEV__ = true;
    });

    it('should call console.log when logger.log is called', () => {
      logger.log('test message');
      expect(console.log).toHaveBeenCalledWith('test message');
    });

    it('should call console.warn when logger.warn is called', () => {
      logger.warn('test warning');
      expect(console.warn).toHaveBeenCalledWith('test warning');
    });

    it('should call console.error when logger.error is called', () => {
      logger.error('test error');
      expect(console.error).toHaveBeenCalledWith('test error');
    });
  });

  describe('when __DEV__ is false', () => {
    beforeEach(() => {
      // @ts-ignore
      global.__DEV__ = false;
    });

    it('should not call console.log when logger.log is called', () => {
      logger.log('test message');
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should not call console.warn when logger.warn is called', () => {
      logger.warn('test warning');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should not call console.error when logger.error is called', () => {
      logger.error('test error');
      expect(console.error).not.toHaveBeenCalled();
    });
  });
});
