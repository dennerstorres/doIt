import React from 'react';
import {useTasks} from '../useTasks';
import {getTasks, saveTasks} from '../../services/storage';
import {Alert, LayoutAnimation, Text, Button, View} from 'react-native';
import renderer, {act} from 'react-test-renderer';

jest.mock('../../services/storage');
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  configureNext: jest.fn(),
  Presets: {
    easeInEaseOut: 'easeInEaseOut',
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
      const success = hook.addTask('New Task');
      expect(success).toBe(true);
    });

    expect(hook.tasks).toHaveLength(1);
    expect(hook.tasks[0].task).toBe('New Task');
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

  it('should delete a task after confirmation', async () => {
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
    expect(LayoutAnimation.configureNext).toHaveBeenCalled();
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
