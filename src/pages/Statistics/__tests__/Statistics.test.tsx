import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import theme from '../../../theme';
import Statistics from '../index';
import {useTasks} from '../../../hooks/useTasks';

jest.mock('../../../hooks/useTasks');
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
}));

const mockTasks = [
  {
    id: '1',
    task: 'Task 1',
    done: true,
    priority: 'high',
    category: 'work',
    archived: false,
    repeat: 'none',
    deadline: null,
    createdAt: '2023-01-01T10:00:00Z',
  },
  {
    id: '2',
    task: 'Task 2',
    done: false,
    priority: 'medium',
    category: 'personal',
    archived: false,
    repeat: 'none',
    deadline: null,
    createdAt: '2023-01-01T10:00:00Z',
  },
];

describe('Statistics Screen', () => {
  it('renders correctly with tasks', () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      loading: false,
    });

    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Statistics />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders empty message when no tasks', () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
    });

    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Statistics />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
