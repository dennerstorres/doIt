import React from 'react';
import {Alert} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Home from '../index';
import {getTasks, saveTasks} from '../../../services/storage';
import theme from '../../../theme';

jest.mock('../../../services/storage', () => ({
  getTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

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
    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro',
      'Não foi possível carregar suas tarefas. Usando armazenamento temporário.',
    );
    consoleSpy.mockRestore();
  });

  it('should handle error when saving tasks', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    getTasks.mockResolvedValueOnce([]);
    saveTasks.mockRejectedValueOnce(new Error('Save error'));

    await act(async () => {
      renderer.create(
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    // saveTasks is called in an effect when tasks !== null
    // After loadTasks resolves to [], tasks becomes [], triggering the effect
    expect(saveTasks).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error saving tasks:',
      expect.any(Error),
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro de Persistência',
      'Não foi possível salvar suas alterações localmente.',
    );
    consoleSpy.mockRestore();
  });
});
