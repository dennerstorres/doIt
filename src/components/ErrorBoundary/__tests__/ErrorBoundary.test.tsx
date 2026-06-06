import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import ErrorBoundary from '../index';
import theme from '../../../theme';

// Silent console.error for tests that throw
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <React.Fragment />
        </ErrorBoundary>
      </ThemeProvider>,
    ).toJSON();

    expect(tree).toBeDefined();
  });

  it('renders fallback UI when a child throws', () => {
    const testRenderer = renderer.create(
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </ThemeProvider>,
    );

    const fallback = testRenderer.root.findByProps({testID: 'error-boundary-fallback'});
    expect(fallback).toBeDefined();

    const message = testRenderer.root.findByProps({children: 'Algo deu errado. Por favor, tente reiniciar o aplicativo.'});
    expect(message).toBeDefined();
  });

  it('resets error state when restart button is pressed', () => {
    const testRenderer = renderer.create(
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </ThemeProvider>,
    );

    // Initial state: has error
    expect(testRenderer.root.findByProps({testID: 'error-boundary-fallback'})).toBeDefined();

    // 1. Update to a healthy child (ErrorBoundary still shows fallback because hasError is true)
    act(() => {
      testRenderer.update(
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <div testID="safe-child" />
          </ErrorBoundary>
        </ThemeProvider>
      );
    });

    // Still showing fallback
    expect(testRenderer.root.findByProps({testID: 'error-boundary-fallback'})).toBeDefined();

    // 2. Trigger restart
    const restartButton = testRenderer.root.findByProps({testID: 'restart-button'});
    act(() => {
      restartButton.props.onPress();
    });

    // Now fallback UI should be gone and safe child should be there
    expect(() => testRenderer.root.findByProps({testID: 'error-boundary-fallback'})).toThrow();
    expect(testRenderer.root.findByProps({testID: 'safe-child'})).toBeDefined();
  });
});
