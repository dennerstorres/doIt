import React from 'react';
import renderer from 'react-test-renderer';
import TaskList from '../index';

// Mocking dependencies to focus on TaskList rendering
jest.mock('../../../components/Task', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return ({item}) => <Text>{item.task}</Text>;
});

jest.mock('../../../components/EmptyState', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return () => <Text>Empty State</Text>;
});

describe('TaskList Component', () => {
  it('should render tasks correctly', () => {
    const tasks = [
      {id: '1', task: 'Task 1', done: false},
      {id: '2', task: 'Task 2', done: true},
    ];

    const tree = renderer
      .create(
        <TaskList
          tasks={tasks}
          handleDoneTask={() => {}}
          handleDeleteTask={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render EmptyState when list is empty', () => {
    const tree = renderer
      .create(
        <TaskList
          tasks={[]}
          handleDoneTask={() => {}}
          handleDeleteTask={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
