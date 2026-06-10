import React from 'react';
import {useTasks} from '../useTasks';
import {TaskService} from '../../services/taskService';
import {Alert, LayoutAnimation, Text, View} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import {Task} from '../../types';

jest.mock('../../services/taskService');
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
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

type UseTasksHookType = ReturnType<typeof useTasks>;

// Test component to exercise the hook
const TestComponent = ({
  onHook,
}: {
  onHook: (data: UseTasksHookType) => void;
}) => {
  const hookData = useTasks();
  onHook(hookData);
  return (
    // @ts-ignore - React Native 0.63.4 types conflict with React 16 JSX
    <View>
      {/* @ts-ignore */}
      <Text testID='loading'>{String(hookData.loading)}</Text>
      {/* @ts-ignore */}
      <Text testID='tasks-count'>
        {hookData.tasks ? hookData.tasks.length : 0}
      </Text>
    </View>
  );
};

describe('useTasks hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load tasks from TaskService on mount', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);

    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    expect(hook.loading).toBe(false);
    expect(hook.tasks).toEqual(mockTasks);
    expect(TaskService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading tasks', async () => {
    (TaskService.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('Storage error'),
    );

    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    expect(hook.loading).toBe(false);
    expect(hook.tasks).toEqual([]);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro',
      'Não foi possível carregar suas tarefas. Usando armazenamento temporário.',
    );
  });

  it('should add a new task successfully', async () => {
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce([]);
    (TaskService.validate as jest.Mock).mockReturnValue({valid: true});
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    const deadline = new Date().toISOString();
    await act(async () => {
      const success = hook.addTask('New Task', 'high', 'work', deadline);
      expect(success).toBe(true);
    });

    expect(hook.tasks).toHaveLength(1);
    if (hook.tasks) {
      expect(hook.tasks[0].task).toBe('New Task');
      expect(hook.tasks[0].priority).toBe('high');
      expect(hook.tasks[0].category).toBe('work');
      expect(hook.tasks[0].deadline).toBe(deadline);
    }
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should not add an invalid task', async () => {
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce([]);
    (TaskService.validate as jest.Mock).mockReturnValue({
      valid: false,
      error: 'A tarefa não pode estar vazia.',
    });
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      const success = hook.addTask('   ');
      expect(success).toBe(false);
    });

    expect(hook.tasks).toHaveLength(0);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Aviso',
      'A tarefa não pode estar vazia.',
    );
  });

  it('should toggle task status and update completedAt', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.toggleTask(mockTasks[0]);
    });

    if (hook.tasks) {
      expect(hook.tasks[0].done).toBe(true);
      expect(hook.tasks[0].completedAt).not.toBeNull();
      expect(typeof hook.tasks[0].completedAt).toBe('string');
    }
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();

    await act(async () => {
      if (hook.tasks) {
        hook.toggleTask(hook.tasks[0]);
      }
    });

    if (hook.tasks) {
      expect(hook.tasks[0].done).toBe(false);
      expect(hook.tasks[0].completedAt).toBeNull();
    }
  });

  it('should delete a task and set lastDeletedTask after confirmation', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.deleteTask(mockTasks[0]);
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Excluir Tarefa?',
      'Tem certeza que deseja excluir esta tarefa?',
      expect.any(Array),
    );

    const deleteButton = (Alert.alert as jest.Mock).mock.calls[0][2][1];
    expect(deleteButton.text).toBe('Excluir');

    await act(async () => {
      deleteButton.onPress();
    });

    expect(hook.tasks).toHaveLength(0);
    expect(hook.lastDeletedTask).toEqual(mockTasks[0]);
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should undo delete task', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.deleteTask(mockTasks[0]);
    });

    const deleteButton = (Alert.alert as jest.Mock).mock.calls[0][2][1];
    await act(async () => {
      deleteButton.onPress();
    });

    expect(hook.tasks).toHaveLength(0);

    await act(async () => {
      hook.undoDelete();
    });

    expect(hook.tasks).toHaveLength(1);
    if (hook.tasks) {
      expect(hook.tasks[0]).toMatchObject({
        id: mockTasks[0].id,
        task: mockTasks[0].task,
        deleted: false,
      });
      expect(typeof hook.tasks[0].updatedAt).toBe('string');
    }
    expect(hook.lastDeletedTask).toBeNull();
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should edit a task successfully', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Original Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    (TaskService.validate as jest.Mock).mockReturnValue({valid: true});
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    const deadline = new Date().toISOString();
    await act(async () => {
      const success = hook.editTask(
        '1',
        'Updated Task',
        'medium',
        'personal',
        deadline,
      );
      expect(success).toBe(true);
    });

    if (hook.tasks) {
      expect(hook.tasks[0].task).toBe('Updated Task');
      expect(hook.tasks[0].priority).toBe('medium');
      expect(hook.tasks[0].category).toBe('personal');
      expect(hook.tasks[0].deadline).toBe(deadline);
    }
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should not edit a task if validation fails', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Original Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    (TaskService.validate as jest.Mock).mockReturnValue({
      valid: false,
      error: 'A tarefa não pode estar vazia.',
    });
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      const success = hook.editTask('1', '   ');
      expect(success).toBe(false);
    });

    if (hook.tasks) {
      expect(hook.tasks[0].task).toBe('Original Task');
    }
    expect(Alert.alert).toHaveBeenCalledWith(
      'Aviso',
      'A tarefa não pode estar vazia.',
    );
  });

  it('should archive a task', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.archiveTask(mockTasks[0]);
    });

    if (hook.tasks) {
      expect(hook.tasks[0].archived).toBe(true);
    }
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should clear lastDeletedTask', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        deleted: false,
      },
    ];
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.deleteTask(mockTasks[0]);
    });

    const deleteButton = (Alert.alert as jest.Mock).mock.calls[0][2][1];
    await act(async () => {
      deleteButton.onPress();
    });

    expect(hook.lastDeletedTask).toEqual(mockTasks[0]);

    await act(async () => {
      hook.clearLastDeletedTask();
    });

    expect(hook.lastDeletedTask).toBeNull();
  });

  it('should persist tasks when they change', async () => {
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce([]);
    (TaskService.validate as jest.Mock).mockReturnValue({valid: true});
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.addTask('New Task');
    });

    expect(TaskService.saveAll).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should handle error when saving tasks', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce([]);
    (TaskService.validate as jest.Mock).mockReturnValue({valid: true});
    (TaskService.saveAll as jest.Mock).mockRejectedValueOnce(
      new Error('Save error'),
    );

    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.addTask('New Task');
    });

    expect(TaskService.saveAll).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[ERROR] Error saving tasks:'),
      expect.any(Error),
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro de Persistência',
      'Não foi possível salvar suas alterações localmente.',
    );
    consoleSpy.mockRestore();
  });

  it('should create a new instance when a repeating task is completed', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Repeat Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'daily',
        archived: false,
        deadline: null,
        createdAt: new Date().toISOString(),
        completedAt: null,
      },
    ];
    const nextTask: Task = {
      ...mockTasks[0],
      id: '2',
      done: false,
      completedAt: null,
      updatedAt: new Date().toISOString(),
      deleted: false,
    };
    (TaskService.getAll as jest.Mock).mockResolvedValueOnce(mockTasks);
    (TaskService.getNextOccurrence as jest.Mock).mockReturnValue(nextTask);

    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.toggleTask(mockTasks[0]);
    });

    expect(hook.tasks).toHaveLength(2);
    expect(TaskService.getNextOccurrence).toHaveBeenCalledWith(mockTasks[0]);
  });
});
