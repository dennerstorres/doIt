import React from 'react';
import {Alert} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Home from '../index';
import TaskList from '../../../components/TaskList';
import {TaskService} from '../../../services/taskService';
import theme from '../../../theme';

jest.mock('../../../services/taskService');

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
    (TaskService.getAll as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves

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

  it('should load tasks from TaskService on mount', async () => {
    const mockTasks = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '2023-01-01T10:00:00Z',
        completedAt: null,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);

    let component: any;
    await act(async () => {
      component = renderer.create(
        /* @ts-ignore */
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    expect(TaskService.getAll).toHaveBeenCalledTimes(1);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle error when loading tasks', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (TaskService.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('Load error'),
    );

    await act(async () => {
      renderer.create(
        /* @ts-ignore */
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    expect(TaskService.getAll).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[ERROR] Error loading tasks:'),
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
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce([]);
    (TaskService.saveAll as jest.Mock).mockRejectedValueOnce(
      new Error('Save error'),
    );

    await act(async () => {
      renderer.create(
        /* @ts-ignore */
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>,
      );
    });

    // TaskService.saveAll is called in an effect when tasks !== null
    // After loadTasks resolves to [], tasks becomes [], triggering the effect
    expect(TaskService.saveAll).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[ERROR] Error saving tasks:'),
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
      {
        id: '1',
        task: 'A Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '2023-01-01T10:00:00Z',
        completedAt: null,
      },
      {
        id: '2',
        task: 'B Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '2023-01-01T11:00:00Z',
        completedAt: null,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValue(mockTasks);

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

  it('should filter tasks when filter buttons are pressed', async () => {
    const mockTasks = [
      {
        id: '1',
        task: 'Done Task',
        done: true,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '2023-01-01T10:00:00Z',
        completedAt: '2023-01-01T10:30:00Z',
      },
      {
        id: '2',
        task: 'Pending Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '2023-01-01T11:00:00Z',
        completedAt: null,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValue(mockTasks);

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

    // Default filter: Todas
    let taskList = component.root.findByType(TaskList);
    expect(taskList.props.tasks.length).toBe(2);

    // Switch to Pendentes
    const filterBtnPending = component.root.findByProps({
      testID: 'filter-button-pending',
    });
    await act(async () => {
      filterBtnPending.props.onPress();
    });

    taskList = component.root.findByType(TaskList);
    expect(taskList.props.tasks.length).toBe(1);
    expect(taskList.props.tasks[0].id).toBe('2');

    // Switch to Concluídas
    const filterBtnCompleted = component.root.findByProps({
      testID: 'filter-button-completed',
    });
    await act(async () => {
      filterBtnCompleted.props.onPress();
    });

    taskList = component.root.findByType(TaskList);
    expect(taskList.props.tasks.length).toBe(1);
    expect(taskList.props.tasks[0].id).toBe('1');

    // Switch back to Todas
    const filterBtnAll = component.root.findByProps({
      testID: 'filter-button-all',
    });
    await act(async () => {
      filterBtnAll.props.onPress();
    });

    taskList = component.root.findByType(TaskList);
    expect(taskList.props.tasks.length).toBe(2);
  });
});
