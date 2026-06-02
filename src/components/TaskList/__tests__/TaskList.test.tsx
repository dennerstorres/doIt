import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import TaskList from '../index';
import theme from '../../../theme';
import {Task, TaskPriority, TaskCategory} from '../../../types';

// Mocking dependencies to focus on TaskList rendering
jest.mock('../../../components/Task', () => {
  const {Text} = require('react-native');
  return ({item}: {item: Task}) => <Text>{item.task}</Text>;
});

jest.mock('../../../components/EmptyState', () => {
  const {Text} = require('react-native');
  return () => <Text>Empty State</Text>;
});

describe('TaskList Component', () => {
  it('should render tasks correctly', () => {
    const tasks: Task[] = [
      {
        id: '1',
        task: 'Task 1',
        done: false,
        priority: 'none' as TaskPriority,
        category: 'none' as TaskCategory,
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '2023-01-01T12:00:00.000Z',
      },
      {
        id: '2',
        task: 'Task 2',
        done: true,
        priority: 'none' as TaskPriority,
        category: 'none' as TaskCategory,
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '2023-01-01T12:00:00.000Z',
      },
    ];

    const tree = renderer
      .create(
        // @ts-ignore
        <ThemeProvider theme={theme}>
          <TaskList
            tasks={tasks}
            handleDoneTask={() => {}}
            handleDeleteTask={() => {}}
            handleArchiveTask={() => {}}
            handleEditTask={() => true}
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render EmptyState when list is empty', () => {
    const tree = renderer
      .create(
        // @ts-ignore
        <ThemeProvider theme={theme}>
          <TaskList
            tasks={[]}
            handleDoneTask={() => {}}
            handleDeleteTask={() => {}}
            handleArchiveTask={() => {}}
            handleEditTask={() => true}
          />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
