import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import AddTask from '../index';
import theme from '../../../theme';
import {MAX_TASK_LENGTH} from '../../../constants/tasks';

// Mocking icons to avoid rendering issues in tests
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const renderWithTheme = component => {
  return renderer.create(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
  );
};

describe('AddTask Component', () => {
  it('should render correctly', () => {
    const tree = renderWithTheme(
      <AddTask task='' onChangeText={() => {}} onAdd={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onAdd when plus button is pressed', () => {
    const onAddMock = jest.fn();
    const component = renderWithTheme(
      <AddTask task='New Task' onChangeText={() => {}} onAdd={onAddMock} />,
    );

    // Find ButtonAdd by its onPress prop
    const plusButton = component.root.findByProps({onPress: onAddMock});

    act(() => {
      plusButton.props.onPress();
    });

    expect(onAddMock).toHaveBeenCalled();
  });

  it('should call onChangeText with empty string when clear button is pressed', () => {
    const onChangeTextMock = jest.fn();
    const component = renderWithTheme(
      <AddTask
        task='Some task'
        onChangeText={onChangeTextMock}
        onAdd={() => {}}
      />,
    );

    // Find the icon named 'x'
    const icon = component.root.findByProps({name: 'x'});

    // Find the closest parent with onPress
    let parent = icon.parent;
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
      <AddTask task='New Task' onChangeText={() => {}} onAdd={onAddMock} />,
    );
    const input = component.root.findByType('TextInput');

    act(() => {
      input.props.onSubmitEditing();
    });

    expect(onAddMock).toHaveBeenCalled();
  });

  it('should show counter when task length is greater than 40', () => {
    const longTask = 'a'.repeat(41);
    const component = renderWithTheme(
      <AddTask task={longTask} onChangeText={() => {}} onAdd={() => {}} />,
    );

    // Filter elements to find the counter
    const found = component.root.findAll(el => {
      return (
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
      <AddTask task={task} onChangeText={() => {}} onAdd={() => {}} />,
    );

    const found = component.root.findAll(el => {
      return (
        el.type === 'Text' &&
        el.props.children &&
        el.props.children.join &&
        el.props.children.join('') === `40/${MAX_TASK_LENGTH}`
      );
    });
    expect(found.length).toBe(0);
  });
});
