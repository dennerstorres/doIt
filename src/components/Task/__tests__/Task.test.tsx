import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import TaskComponent from '../index';
import theme from '../../../theme';
import {Task, TaskPriority, TaskCategory, TaskRepeat} from '../../../types';

// Mocking Swipeable from react-native-gesture-handler
jest.mock('react-native-gesture-handler/Swipeable', () => {
  const ReactMock = require('react');
  const {View} = require('react-native');
  return class Swipeable extends ReactMock.Component<any> {
    render() {
      const {renderLeftActions, renderRightActions, children} = this.props;
      const dragXMock = {
        interpolate: jest.fn().mockReturnValue('interpolate-mock'),
      };
      return (
        <View testID='mock-swipeable'>
          {renderLeftActions && renderLeftActions(null, dragXMock)}
          {children}
          {renderRightActions && renderRightActions(null, dragXMock)}
        </View>
      );
    }
    close() {}
  };
});

// Mocking Animated.timing
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = (value: any, config: any) => ({
    start: (callback?: () => void) => {
      value.setValue(config.toValue);
      if (callback) {
        callback();
      }
    },
  });
  return RN;
});

const mockTask: Task = {
  id: '1',
  task: 'Test Task',
  done: false,
  priority: 'none' as TaskPriority,
  category: 'none' as TaskCategory,
  repeat: 'none' as TaskRepeat,
  deadline: null,
  createdAt: new Date().toISOString(),
};

describe('Task Component', () => {
  it('renders correctly for a pending task', () => {
    const tree = renderer
      .create(
        // @ts-ignore
        <ThemeProvider theme={theme}>
          <TaskComponent
            item={mockTask}
            onDone={jest.fn()}
            onDelete={jest.fn()}
            onEdit={jest.fn()}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly for a completed task', () => {
    const completedTask = {...mockTask, done: true};
    const tree = renderer
      .create(
        // @ts-ignore
        <ThemeProvider theme={theme}>
          <TaskComponent
            item={completedTask}
            onDone={jest.fn()}
            onDelete={jest.fn()}
            onEdit={jest.fn()}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('enters editing mode when edit action is pressed', () => {
    const component = renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <TaskComponent
          item={mockTask}
          onDone={jest.fn()}
          onDelete={jest.fn()}
          onEdit={jest.fn()}
        />
      </ThemeProvider>,
    );

    const editAction = component.root.findByProps({testID: 'edit-action'});

    renderer.act(() => {
      editAction.props.onPress();
    });

    const editInput = component.root.findByProps({testID: 'task-edit-input'});
    expect(editInput.props.value).toBe(mockTask.task);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('calls onEdit and leaves editing mode on save', () => {
    const onEdit = jest.fn().mockReturnValue(true);
    const component = renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <TaskComponent
          item={mockTask}
          onDone={jest.fn()}
          onDelete={jest.fn()}
          onEdit={onEdit}
        />
      </ThemeProvider>,
    );

    // Enter editing mode
    renderer.act(() => {
      component.root.findByProps({testID: 'edit-action'}).props.onPress();
    });

    // Change text
    const editInput = component.root.findByProps({testID: 'task-edit-input'});
    renderer.act(() => {
      editInput.props.onChangeText('Updated Task');
    });

    // Save
    renderer.act(() => {
      component.root.findByProps({testID: 'save-edit-button'}).props.onPress();
    });

    expect(onEdit).toHaveBeenCalledWith(
      mockTask.id,
      'Updated Task',
      expect.any(String),
      expect.any(String),
      null,
      'none',
    );
    // Verify it returned to normal mode
    expect(
      component.root.findAllByProps({testID: 'task-edit-input'}),
    ).toHaveLength(0);
  });

  it('leaves editing mode on cancel without calling onEdit', () => {
    const onEdit = jest.fn();
    const component = renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <TaskComponent
          item={mockTask}
          onDone={jest.fn()}
          onDelete={jest.fn()}
          onEdit={onEdit}
        />
      </ThemeProvider>,
    );

    // Enter editing mode
    renderer.act(() => {
      component.root.findByProps({testID: 'edit-action'}).props.onPress();
    });

    // Cancel
    renderer.act(() => {
      component.root
        .findByProps({testID: 'cancel-edit-button'})
        .props.onPress();
    });

    expect(onEdit).not.toHaveBeenCalled();
    expect(
      component.root.findAllByProps({testID: 'task-edit-input'}),
    ).toHaveLength(0);
  });

  it('allows changing category in editing mode', () => {
    const onEdit = jest.fn().mockReturnValue(true);
    const component = renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <TaskComponent
          item={mockTask}
          onDone={jest.fn()}
          onDelete={jest.fn()}
          onEdit={onEdit}
        />
      </ThemeProvider>,
    );

    // Enter editing mode
    renderer.act(() => {
      component.root.findByProps({testID: 'edit-action'}).props.onPress();
    });

    // Change category
    const workCategoryButton = component.root.findByProps({
      testID: 'category-edit-button-work',
    });
    renderer.act(() => {
      workCategoryButton.props.onPress();
    });

    // Save
    renderer.act(() => {
      component.root.findByProps({testID: 'save-edit-button'}).props.onPress();
    });

    expect(onEdit).toHaveBeenCalledWith(
      mockTask.id,
      mockTask.task,
      mockTask.priority,
      'work',
      null,
      'none',
    );
  });
});
