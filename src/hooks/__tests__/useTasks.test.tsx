import React from 'react';
import {useTasks} from '../useTasks';
// @ts-ignore - storage.js is still in JS
import {getTasks, saveTasks} from '../../services/storage';
import {Alert, LayoutAnimation, Text, View} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import {Task} from '../../types';

jest.mock('../../services/storage');
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

  it('should load tasks from storage on mount', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    expect(hook.loading).toBe(false);
    expect(hook.tasks).toEqual(mockTasks);
    expect(getTasks).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading tasks', async () => {
    (getTasks as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

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
    (getTasks as jest.Mock).mockResolvedValueOnce([]);
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

  it('should not add an empty task', async () => {
    (getTasks as jest.Mock).mockResolvedValueOnce([]);
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

  it('should toggle task status', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Test Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.toggleTask(mockTasks[0]);
    });

    if (hook.tasks) {
      expect(hook.tasks[0].done).toBe(true);
    }
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();

    await act(async () => {
      if (hook.tasks) {
        hook.toggleTask(hook.tasks[0]);
      }
    });

    if (hook.tasks) {
      expect(hook.tasks[0].done).toBe(false);
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
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
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
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
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
      expect(hook.tasks[0]).toEqual(mockTasks[0]);
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
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
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

  it('should not edit a task with empty title', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Original Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
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

  it('should not edit a task to a duplicate title', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Task 1',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        deadline: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        task: 'Task 2',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      const success = hook.editTask('1', 'Task 2');
      expect(success).toBe(false);
    });

    if (hook.tasks) {
      expect(hook.tasks[0].task).toBe('Task 1');
    }
    expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Esta tarefa já existe.');
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
        deadline: null,
        createdAt: new Date().toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
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
    (getTasks as jest.Mock).mockResolvedValueOnce([]);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.addTask('New Task');
    });

    expect(saveTasks).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should create a new instance when a daily repeating task is completed', async () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Repeat Daily',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'daily',
        deadline: today.toISOString(),
        createdAt: today.toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.toggleTask(mockTasks[0]);
    });

    expect(hook.tasks).toHaveLength(2);
    if (hook.tasks) {
      const originalTask = hook.tasks.find(t => t.id === '1');
      const newTask = hook.tasks.find(t => t.id !== '1');

      expect(originalTask?.done).toBe(true);
      expect(newTask?.task).toBe('Repeat Daily');
      expect(newTask?.repeat).toBe('daily');
      expect(newTask?.done).toBe(false);

      if (newTask?.deadline) {
        const nextDate = new Date(newTask.deadline);
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() + 1);
        expect(nextDate.toISOString()).toBe(expectedDate.toISOString());
      }
    }
  });

  it('should create a new instance when a weekly repeating task is completed', async () => {
    const today = new Date();
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Repeat Weekly',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'weekly',
        deadline: today.toISOString(),
        createdAt: today.toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.toggleTask(mockTasks[0]);
    });

    expect(hook.tasks).toHaveLength(2);
    if (hook.tasks) {
      const newTask = hook.tasks.find(t => t.id !== '1');
      if (newTask?.deadline) {
        const nextDate = new Date(newTask.deadline);
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() + 7);
        expect(nextDate.toISOString()).toBe(expectedDate.toISOString());
      }
    }
  });

  it('should create a new instance when a monthly repeating task is completed', async () => {
    const today = new Date();
    const mockTasks: Task[] = [
      {
        id: '1',
        task: 'Repeat Monthly',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'monthly',
        deadline: today.toISOString(),
        createdAt: today.toISOString(),
      },
    ];
    (getTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
    let hook!: UseTasksHookType;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.toggleTask(mockTasks[0]);
    });

    expect(hook.tasks).toHaveLength(2);
    if (hook.tasks) {
      const newTask = hook.tasks.find(t => t.id !== '1');
      if (newTask?.deadline) {
        const nextDate = new Date(newTask.deadline);
        const expectedDate = new Date(today);
        expectedDate.setMonth(expectedDate.getMonth() + 1);
        expect(nextDate.toISOString()).toBe(expectedDate.toISOString());
      }
    }
  });
});
