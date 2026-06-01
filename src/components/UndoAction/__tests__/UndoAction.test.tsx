import React from 'react';
import renderer, {act} from 'react-test-renderer';
import UndoAction from '../index';
import {ThemeProvider} from 'styled-components/native';
import theme from '../../../theme';
import {Animated} from 'react-native';

// Mock Animated and setTimeout
jest.useFakeTimers();

// Spy on Animated.timing
const timingSpy = jest.spyOn(Animated, 'timing');

describe('UndoAction component', () => {
  const mockOnUndo = jest.fn();
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    // Default implementation for timing that just calls the callback
    timingSpy.mockImplementation((value, config: any) => {
      return {
        start: (callback?: (result: {finished: boolean}) => void) => {
          value.setValue(config.toValue);
          if (callback) {
            callback({finished: true});
          }
        },
        stop: () => {},
      } as any;
    });
  });

  afterAll(() => {
    timingSpy.mockRestore();
  });

  const renderComponent = (props?: any) => {
    return renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <UndoAction onUndo={mockOnUndo} onDismiss={mockOnDismiss} {...props} />
      </ThemeProvider>,
    );
  };

  it('renders correctly', () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onUndo when undo button is pressed', () => {
    const component = renderComponent();
    const undoButton = component.root.findByProps({testID: 'undo-button'});

    act(() => {
      undoButton.props.onPress();
    });

    expect(mockOnUndo).toHaveBeenCalledTimes(1);
  });

  it('calls onDismiss automatically after timeout', () => {
    act(() => {
      renderComponent();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('clears timeout on unmount', () => {
    let component: any;
    act(() => {
      component = renderComponent();
    });

    act(() => {
      component.unmount();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockOnDismiss).not.toHaveBeenCalled();
  });
});
