import React from 'react';
import {Alert} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Home from '../index';
import TaskList from '../../../components/TaskList';
import {getTasks, saveTasks} from '../../../services/storage';
import theme from '../../../theme';

jest.mock('../../../services/storage', () => ({
  getTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

// Mocking LayoutAnimation and UIManager to avoid errors in tests
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  configureNext: jest.fn(),
  Presets: {
    easeInEaseOut: 'easeInEaseOut',
    spring: 'spring',
  },
  Types: {
    spring: 'spring',
    easeInEaseOut: 'easeInEaseOut',
  },
  Properties: {
    opacity: 'opacity',
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading indicator initially', async () => {
    (getTasks as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves

    let component: any;
    await act(async () => {
      component = renderer.create(
        /* @ts-ignore */
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
    const mockTasks = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        createdAt: '2023-01-01T10:00:00Z',
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    let component: any;
    await act(async () => {
      component = renderer.create(
        /* @ts-ignore */
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
    (getTasks as jest.Mock).mockRejectedValueOnce(new Error('Load error'));

    await act(async () => {
      renderer.create(
        /* @ts-ignore */
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
    expect(mockAlert).toHaveBeenCalledWith(
      'Erro',
      'Não foi possível carregar suas tarefas. Usando armazenamento temporário.',
    );
    consoleSpy.mockRestore();
  });

  it('should handle error when saving tasks', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (getTasks as jest.Mock).mockResolvedValueOnce([]);
    (saveTasks as jest.Mock).mockRejectedValueOnce(new Error('Save error'));

    await act(async () => {
      renderer.create(
        /* @ts-ignore */
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
    expect(mockAlert).toHaveBeenCalledWith(
      'Erro de Persistência',
      'Não foi possível salvar suas alterações localmente.',
    );
    consoleSpy.mockRestore();
  });

  it('should change sorting when sort buttons are pressed', async () => {
    const mockTasks = [
      {id: '1', task: 'A Task', done: false, createdAt: '2023-01-01T10:00:00Z'},
      {id: '2', task: 'B Task', done: false, createdAt: '2023-01-01T11:00:00Z'},
    ];
    (getTasks as jest.Mock).mockResolvedValue(mockTasks);

    let component: any;
    await act(async () => {
      component = renderer.create(
        /* @ts-ignore */
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    // wait for useEffect that loads tasks
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Default sort: Status + Date Desc -> ID 2 (11:00), ID 1 (10:00)
    let taskList = component.root.findByType(TaskList);
    expect(taskList.props.tasks[0].id).toBe('2');

    // Switch to Alphabetical: ID 1 (A Task), ID 2 (B Task)
    const sortBtnAZ = component.root.findByProps({
      testID: 'sort-button-alphabetical',
    });
    await act(async () => {
      sortBtnAZ.props.onPress();
    });

    taskList = component.root.findByType(TaskList);
    expect(taskList.props.tasks[0].id).toBe('1');
  });
});
