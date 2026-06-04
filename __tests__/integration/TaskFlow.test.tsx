import React from 'react';
import {Alert, TextInput} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import App from '../../src/App';
import {getTasks, saveTasks} from '../../src/services/storage';
import AddTask from '../../src/components/AddTask';
import Search from '../../src/components/Search';
import Statistics from '../../src/pages/Statistics';
import TaskList from '../../src/components/TaskList';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../src/theme';

// Mock storage
jest.mock('../../src/services/storage', () => ({
  getTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Task Flow Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should complete a full user journey', async () => {
    let internalTasks: any[] = [];
    (getTasks as jest.Mock).mockImplementation(() => Promise.resolve([...internalTasks]));
    (saveTasks as jest.Mock).mockImplementation((newTasks) => {
        internalTasks = [...newTasks];
        return Promise.resolve();
    });

    let component: any;
    await act(async () => {
      component = renderer.create(<App />);
    });

    // Wait for loadTasks
    await act(async () => {
        await Promise.resolve();
    });

    // 1. Verify initial state (empty)
    const taskList = component.root.findByType(TaskList);
    expect(taskList.props.tasks).toHaveLength(0);

    // 2. Add a task
    const addTaskComponent = component.root.findByType(AddTask);
    const textInput = addTaskComponent.findByType(TextInput);

    await act(async () => {
      textInput.props.onChangeText('Integration Task');
    });

    // Select priority High
    const highPriorityBtn = addTaskComponent.findByProps({
      testID: 'priority-button-high',
    });
    await act(async () => {
      highPriorityBtn.props.onPress();
    });

    // Select category Work
    const workCategoryBtn = addTaskComponent.findByProps({
      testID: 'category-button-work',
    });
    await act(async () => {
      workCategoryBtn.props.onPress();
    });

    // Submit task
    await act(async () => {
      textInput.props.onSubmitEditing();
    });

    // Wait for state updates triggered by addTask
    await act(async () => {
        await Promise.resolve();
    });

    // Verify task is in list
    expect(taskList.props.tasks).toHaveLength(1);
    expect(taskList.props.tasks[0].task).toBe('Integration Task');

    // Verify storage was called
    expect(saveTasks).toHaveBeenCalled();

    // 3. Toggle task completion
    await act(async () => {
      taskList.props.handleDoneTask(taskList.props.tasks[0]);
    });

    // Verify completion
    expect(taskList.props.tasks[0].done).toBe(true);

    // 4. Search for a task
    const searchComponent = component.root.findByType(Search);
    const searchInput = searchComponent.findByType(TextInput);

    await act(async () => {
      searchInput.props.onChangeText('Non-existent');
    });

    expect(taskList.props.tasks).toHaveLength(0);

    await act(async () => {
      searchInput.props.onChangeText('Integration');
    });

    expect(taskList.props.tasks).toHaveLength(1);

    // 5. Delete and Undo
    const currentTask = taskList.props.tasks[0];
    await act(async () => {
      taskList.props.handleDeleteTask(currentTask);
    });

    // Confirm deletion in Alert
    expect(mockAlert).toHaveBeenCalledWith(
      'Excluir Tarefa?',
      'Tem certeza que deseja excluir esta tarefa?',
      expect.any(Array),
    );

    const deleteConfirmBtn = mockAlert.mock.calls[0][2]?.find(
      (btn: any) => btn.text === 'Excluir',
    );
    await act(async () => {
      deleteConfirmBtn?.onPress?.();
    });

    expect(taskList.props.tasks).toHaveLength(0);

    // Verify Undo action appears
    const undoBtn = component.root.findByProps({testID: 'undo-button'});
    expect(undoBtn).toBeTruthy();

    await act(async () => {
      undoBtn.props.onPress();
    });

    expect(taskList.props.tasks).toHaveLength(1);

    // 6. Navigate to Statistics
    const statsBtn = component.root.findByProps({testID: 'header-stats-button'});
    await act(async () => {
      statsBtn.props.onPress();
    });

    // Statistics metrics verification by separate rendering
    let statsComponent: any;
    await act(async () => {
        statsComponent = renderer.create(
            <ThemeProvider theme={theme}>
                <Statistics />
            </ThemeProvider>
        );
    });

    // Find the MainStatValue content (percentage)
    const statsText = statsComponent.toJSON();
    const statsString = JSON.stringify(statsText);
    expect(statsString).toContain('100%');
  });
});
