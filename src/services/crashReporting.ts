/**
 * Service to handle fatal and non-fatal errors.
 * Provides a foundation for future external service integration (like Sentry or Firebase).
 */
export const crashReporting = {
  /**
   * Initializes the crash reporting service.
   * Captures global JavaScript errors using the standard React Native ErrorUtils.
   */
  init(): void {
    // @ts-ignore - ErrorUtils is global in React Native but might not be in standard TS types
    if (global.ErrorUtils) {
      // @ts-ignore
      const originalHandler = global.ErrorUtils.getGlobalHandler();

      // @ts-ignore
      global.ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
        // Log the error for debugging
        if (__DEV__) {
          console.error('[Crash Reporting] Global Error Captured:', {
            message: error?.message,
            isFatal,
            stack: error?.stack,
          });
        }

        /**
         * FUTURE INTEGRATION:
         * In production, this is where we would send the error to a service
         * like Sentry, Bugsnag, or Firebase Crashlytics.
         *
         * Example:
         * if (!__DEV__) {
         *   ExternalService.captureException(error, { extra: { isFatal } });
         * }
         */

        // Call the original handler (usually displays the Red Box in development)
        if (originalHandler) {
          originalHandler(error, isFatal);
        }
      });
    }
  },

  /**
   * Manually reports a non-fatal error.
   * @param error - The error to report.
   * @param context - Additional context information.
   */
  reportError(error: any, context?: string): void {
    if (__DEV__) {
      console.warn(
        `[Crash Reporting] Manual Error Report (${context || 'No Context'}):`,
        error,
      );
    }

    /**
     * FUTURE INTEGRATION:
     * if (!__DEV__) {
     *   ExternalService.captureException(error, { extra: { context } });
     * }
     */
  },
};
