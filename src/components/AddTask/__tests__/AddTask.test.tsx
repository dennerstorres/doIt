import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import AddTask from '../index';
import theme from '../../../theme';
import {MAX_TASK_LENGTH} from '../../../constants/tasks';

// Mocking icons to avoid rendering issues in tests
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const renderWithTheme = (component: React.ReactElement) => {
  return renderer.create(
    // @ts-ignore
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
  );
};

describe('AddTask Component', () => {
  it('should render correctly', () => {
    const tree = renderWithTheme(
      <AddTask
        task=''
        onChangeText={() => {}}
        onAdd={() => {}}
        loading={false}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onAdd when plus button is pressed', () => {
    const onAddMock = jest.fn();
    const component = renderWithTheme(
      <AddTask
        task='New Task'
        onChangeText={() => {}}
        onAdd={onAddMock}
        loading={false}
      />,
    );

    // Find the icon named 'plus'
    const icon = component.root.findAllByProps({name: 'plus'})[0];

    // Find the closest parent with onPress
    let parent: any = icon.parent;
    while (parent && !parent.props.onPress) {
      parent = parent.parent;
    }

    act(() => {
      parent.props.onPress();
    });

    expect(onAddMock).toHaveBeenCalledWith('none', 'none', null, 'none');
  });

  it('should call onAdd with selected priority, category and deadline', () => {
    const onAddMock = jest.fn();
    const component = renderWithTheme(
      <AddTask
        task='New Task'
        onChangeText={() => {}}
        onAdd={onAddMock}
        loading={false}
      />,
    );

    const highPriorityButton = component.root.findByProps({
      testID: 'priority-button-high',
    });
    const workCategoryButton = component.root.findByProps({
      testID: 'category-button-work',
    });

    act(() => {
      highPriorityButton.props.onPress();
      workCategoryButton.props.onPress();
    });

    expect(onAddMock).not.toHaveBeenCalled();

    const plusIcon = component.root.findAllByProps({name: 'plus'})[0];
    let addButton: any = plusIcon.parent;
    while (addButton && !addButton.props.onPress) {
      addButton = addButton.parent;
    }

    act(() => {
      addButton.props.onPress();
    });

    expect(onAddMock).toHaveBeenCalledWith('high', 'work', null, 'none');
  });

  it('should call onChangeText with empty string when clear button is pressed', () => {
    const onChangeTextMock = jest.fn();
    const component = renderWithTheme(
      <AddTask
        task='Some task'
        onChangeText={onChangeTextMock}
        onAdd={() => {}}
        loading={false}
      />,
    );

    // Find the icon named 'x'
    const icon = component.root.findByProps({name: 'x'});

    // Find the closest parent with onPress
    let parent: any = icon.parent;
    while (parent && !parent.props.onPress) {
      parent = parent.parent;
    }

    act(() => {
      parent.props.onPress();
    });

    expect(onChangeTextMock).toHaveBeenCalledWith('');
  });

  it('should call onAdd when onSubmitEditing is triggered on TextInput', () => {
    const onAddMock = jest.fn();
    const component = renderWithTheme(
      <AddTask
        task='New Task'
        onChangeText={() => {}}
        onAdd={onAddMock}
        loading={false}
      />,
    );
    // @ts-ignore
    const input = component.root.findByType('TextInput');

    act(() => {
      input.props.onSubmitEditing();
    });

    expect(onAddMock).toHaveBeenCalled();
  });

  it('should show counter when task length is greater than 40', () => {
    const longTask = 'a'.repeat(41);
    const component = renderWithTheme(
      <AddTask
        task={longTask}
        onChangeText={() => {}}
        onAdd={() => {}}
        loading={false}
      />,
    );

    // Filter elements to find the counter
    const found = component.root.findAll(el => {
      return (
        // @ts-ignore
        el.type === 'Text' &&
        el.props.children &&
        el.props.children.join &&
        el.props.children.join('') === `41/${MAX_TASK_LENGTH}`
      );
    });

    expect(found.length).toBeGreaterThan(0);
  });

  it('should NOT show counter when task length is 40 or less', () => {
    const task = 'a'.repeat(40);
    const component = renderWithTheme(
      <AddTask
        task={task}
        onChangeText={() => {}}
        onAdd={() => {}}
        loading={false}
      />,
    );

    const found = component.root.findAll(el => {
      return (
        // @ts-ignore
        el.type === 'Text' &&
        el.props.children &&
        el.props.children.join &&
        el.props.children.join('') === `40/${MAX_TASK_LENGTH}`
      );
    });
    expect(found.length).toBe(0);
  });
});
