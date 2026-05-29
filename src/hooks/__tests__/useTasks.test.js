import React from 'react';
import {useTasks} from '../useTasks';
import {getTasks, saveTasks} from '../../services/storage';
import {Alert, LayoutAnimation, Text, View} from 'react-native';
import renderer, {act} from 'react-test-renderer';

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

// Test component to exercise the hook
const TestComponent = ({onHook}) => {
  const hookData = useTasks();
  onHook(hookData);
  return (
    <View>
      <Text testID='loading'>{String(hookData.loading)}</Text>
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
    const mockTasks = [{id: '1', task: 'Test Task', done: false}];
    getTasks.mockResolvedValueOnce(mockTasks);

    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    expect(hook.loading).toBe(false);
    expect(hook.tasks).toEqual(mockTasks);
    expect(getTasks).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading tasks', async () => {
    getTasks.mockRejectedValueOnce(new Error('Storage error'));

    let hook;
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
    getTasks.mockResolvedValueOnce([]);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      const success = hook.addTask('New Task', 'high', 'work');
      expect(success).toBe(true);
    });

    expect(hook.tasks).toHaveLength(1);
    expect(hook.tasks[0].task).toBe('New Task');
    expect(hook.tasks[0].priority).toBe('high');
    expect(hook.tasks[0].category).toBe('work');
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should not add an empty task', async () => {
    getTasks.mockResolvedValueOnce([]);
    let hook;
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
    const mockTasks = [{id: '1', task: 'Test Task', done: false}];
    getTasks.mockResolvedValueOnce(mockTasks);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.toggleTask(mockTasks[0]);
    });

    expect(hook.tasks[0].done).toBe(true);
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();

    await act(async () => {
      hook.toggleTask(hook.tasks[0]);
    });

    expect(hook.tasks[0].done).toBe(false);
  });

  it('should delete a task and set lastDeletedTask after confirmation', async () => {
    const mockTasks = [{id: '1', task: 'Test Task', done: false}];
    getTasks.mockResolvedValueOnce(mockTasks);
    let hook;
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

    const deleteButton = Alert.alert.mock.calls[0][2][1];
    expect(deleteButton.text).toBe('Excluir');

    await act(async () => {
      deleteButton.onPress();
    });

    expect(hook.tasks).toHaveLength(0);
    expect(hook.lastDeletedTask).toEqual(mockTasks[0]);
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should undo delete task', async () => {
    const mockTasks = [{id: '1', task: 'Test Task', done: false}];
    getTasks.mockResolvedValueOnce(mockTasks);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.deleteTask(mockTasks[0]);
    });

    const deleteButton = Alert.alert.mock.calls[0][2][1];
    await act(async () => {
      deleteButton.onPress();
    });

    expect(hook.tasks).toHaveLength(0);

    await act(async () => {
      hook.undoDelete();
    });

    expect(hook.tasks).toHaveLength(1);
    expect(hook.tasks[0]).toEqual(mockTasks[0]);
    expect(hook.lastDeletedTask).toBeNull();
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should edit a task successfully', async () => {
    const mockTasks = [
      {
        id: '1',
        task: 'Original Task',
        done: false,
        priority: 'none',
        category: 'none',
      },
    ];
    getTasks.mockResolvedValueOnce(mockTasks);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      const success = hook.editTask('1', 'Updated Task', 'medium', 'personal');
      expect(success).toBe(true);
    });

    expect(hook.tasks[0].task).toBe('Updated Task');
    expect(hook.tasks[0].priority).toBe('medium');
    expect(hook.tasks[0].category).toBe('personal');
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
  });

  it('should not edit a task with empty title', async () => {
    const mockTasks = [{id: '1', task: 'Original Task', done: false}];
    getTasks.mockResolvedValueOnce(mockTasks);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      const success = hook.editTask('1', '   ');
      expect(success).toBe(false);
    });

    expect(hook.tasks[0].task).toBe('Original Task');
    expect(Alert.alert).toHaveBeenCalledWith(
      'Aviso',
      'A tarefa não pode estar vazia.',
    );
  });

  it('should not edit a task to a duplicate title', async () => {
    const mockTasks = [
      {id: '1', task: 'Task 1', done: false},
      {id: '2', task: 'Task 2', done: false},
    ];
    getTasks.mockResolvedValueOnce(mockTasks);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      const success = hook.editTask('1', 'Task 2');
      expect(success).toBe(false);
    });

    expect(hook.tasks[0].task).toBe('Task 1');
    expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Esta tarefa já existe.');
  });

  it('should clear lastDeletedTask', async () => {
    const mockTasks = [{id: '1', task: 'Test Task', done: false}];
    getTasks.mockResolvedValueOnce(mockTasks);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.deleteTask(mockTasks[0]);
    });

    const deleteButton = Alert.alert.mock.calls[0][2][1];
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
    getTasks.mockResolvedValueOnce([]);
    let hook;
    await act(async () => {
      renderer.create(<TestComponent onHook={h => (hook = h)} />);
    });

    await act(async () => {
      hook.addTask('New Task');
    });

    expect(saveTasks).toHaveBeenCalledWith(expect.any(Array));
  });
});
