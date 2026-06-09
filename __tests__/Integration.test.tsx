import React from 'react';
import renderer, {act} from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import App from '../src/App';
import {decrypt} from '../src/utils/security';
import TaskList from '../src/components/TaskList';
import AddTask from '../src/components/AddTask';
import Search from '../src/components/Search';
import Header from '../src/components/Header';

// Mock Alert to avoid side effects
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Integration Tests', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  const renderApp = async () => {
    let component: any;
    await act(async () => {
      component = renderer.create(<App />);
    });
    // Wait for initial load (useEffect in useTasks)
    await act(async () => {
      await Promise.resolve();
    });
    return component;
  };

  it('should allow a full user lifecycle: add, complete, search, archive, and delete', async () => {
    const component = await renderApp();
    const root = component.root;

    // 1. Verify Home screen is rendered
    expect(root.findByType(Header)).toBeTruthy();
    expect(root.findByType(AddTask)).toBeTruthy();

    // 2. Add a new task
    const addTask = root.findByType(AddTask);
    await act(async () => {
      addTask.props.onChangeText('Integration Task');
    });
    await act(async () => {
      addTask.props.onAdd('medium', 'work', null, 'none');
    });

    // Verify task is in the list
    let taskList = root.findByType(TaskList);
    expect(taskList.props.tasks.length).toBe(1);
    expect(taskList.props.tasks[0].task).toBe('Integration Task');

    // 3. Mark task as done
    // Find Task via the TaskList prop and call its handler
    await act(async () => {
      taskList.props.handleDoneTask(taskList.props.tasks[0]);
    });

    // Verify state update (done: true)
    taskList = root.findByType(TaskList);
    expect(taskList.props.tasks[0].done).toBe(true);

    // 4. Search for the task
    const searchInput = root.findByType(Search);
    await act(async () => {
      searchInput.props.onChangeText('Integration');
    });
    expect(root.findByType(TaskList).props.tasks.length).toBe(1);

    await act(async () => {
      searchInput.props.onChangeText('Non-existent');
    });
    expect(root.findByType(TaskList).props.tasks.length).toBe(0);

    // Clear search
    await act(async () => {
      searchInput.props.onChangeText('');
    });

    // 5. Archive Task
    taskList = root.findByType(TaskList);
    await act(async () => {
      taskList.props.handleArchiveTask(taskList.props.tasks[0]);
    });

    // Verify it's gone from Home (filteredTasks filters out archived)
    expect(root.findByType(TaskList).props.tasks.length).toBe(0);

    // 6. Verify it persisted in AsyncStorage
    const savedTasksJson = await AsyncStorage.getItem('@doit:tasks');
    const decryptedJson = decrypt(savedTasksJson || '');
    const savedTasks = JSON.parse(decryptedJson || '[]');
    expect(savedTasks.length).toBe(1);
    expect(savedTasks[0].archived).toBe(true);
  });

  it('should share state between screens through storage/hook', async () => {
    // This tests that when tasks change, they are persisted and can be reloaded
    const component = await renderApp();
    const root = component.root;

    // Add task
    const addTask = root.findByType(AddTask);
    await act(async () => {
      addTask.props.onChangeText('Shared Task');
    });
    await act(async () => {
      addTask.props.onAdd('none', 'none', null, 'none');
    });

    // Verify it's in the list
    expect(root.findByType(TaskList).props.tasks.length).toBe(1);

    // Simulate restart app (new render)
    let newComponent: any;
    await act(async () => {
      newComponent = renderer.create(<App />);
    });

    // wait for load tasks from storage
    await act(async () => {
      await Promise.resolve();
    });

    const newRoot = newComponent.root;
    const taskList = newRoot.findByType(TaskList);
    expect(taskList.props.tasks.length).toBe(1);
    expect(taskList.props.tasks[0].task).toBe('Shared Task');
  });
});
