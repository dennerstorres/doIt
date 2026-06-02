import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import History from '../index';
import theme from '../../../theme';
import {useTasks} from '../../../hooks/useTasks';

// Mock useTasks
jest.mock('../../../hooks/useTasks');
const mockUseTasks = useTasks as jest.Mock;

// Mock navigation
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

// Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({top: 0, bottom: 0}),
}));

describe('History Page', () => {
  const fixedDate = '2026-06-02T20:00:00.000Z';
  const mockTasks = [
    {
      id: '1',
      task: 'Task 1',
      done: false,
      archived: true,
      createdAt: fixedDate,
    },
    {
      id: '2',
      task: 'Task 2',
      done: true,
      archived: true,
      createdAt: fixedDate,
    },
    {
      id: '3',
      task: 'Task 3',
      done: false,
      archived: false,
      createdAt: fixedDate,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with archived tasks', () => {
    mockUseTasks.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      toggleTask: jest.fn(),
      deleteTask: jest.fn(),
      archiveTask: jest.fn(),
      editTask: jest.fn(),
    });

    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <History />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when loading', () => {
    mockUseTasks.mockReturnValue({
      tasks: null,
      loading: true,
      toggleTask: jest.fn(),
      deleteTask: jest.fn(),
      archiveTask: jest.fn(),
      editTask: jest.fn(),
    });

    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <History />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with empty archived list', () => {
    mockUseTasks.mockReturnValue({
      tasks: [mockTasks[2]], // Only non-archived task
      loading: false,
      toggleTask: jest.fn(),
      deleteTask: jest.fn(),
      archiveTask: jest.fn(),
      editTask: jest.fn(),
    });

    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <History />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls navigation.goBack when back button is pressed', () => {
    mockUseTasks.mockReturnValue({
      tasks: [],
      loading: false,
      toggleTask: jest.fn(),
      deleteTask: jest.fn(),
      archiveTask: jest.fn(),
      editTask: jest.fn(),
    });

    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <History />
      </ThemeProvider>,
    );

    const backButton = component.root.findByProps({
      testID: 'header-back-button',
    });

    act(() => {
      backButton.props.onPress();
    });

    expect(mockGoBack).toHaveBeenCalled();
  });
});
