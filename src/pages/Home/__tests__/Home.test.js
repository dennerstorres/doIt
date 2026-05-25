import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Home from '../index';
import {getTasks} from '../../../services/storage';
import theme from '../../../theme';

jest.mock('../../../services/storage', () => ({
  getTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

// Mocking LayoutAnimation and UIManager to avoid errors in tests
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  configureNext: jest.fn(),
  Presets: {
    easeInEaseOut: {},
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading indicator initially', async () => {
    getTasks.mockReturnValue(new Promise(() => {})); // Never resolves

    let component;
    await act(async () => {
      component = renderer.create(
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    const tree = component.toJSON();
    // Verify LoadingIndicator is present (ActivityIndicator in RN)
    const indicator = component.root.findByType('ActivityIndicator');
    expect(indicator).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });

  it('should load tasks from storage on mount', async () => {
    const mockTasks = [{id: '1', task: 'Test Task', done: false}];
    getTasks.mockResolvedValueOnce(mockTasks);

    let component;
    await act(async () => {
      component = renderer.create(
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    expect(getTasks).toHaveBeenCalledTimes(1);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle error when loading tasks', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    getTasks.mockRejectedValueOnce(new Error('Load error'));

    await act(async () => {
      renderer.create(
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    expect(getTasks).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error loading tasks:',
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });
});
