import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Task from '../index';
import theme from '../../../theme';

// Mocking Swipeable from react-native-gesture-handler
jest.mock('react-native-gesture-handler/Swipeable', () => {
  const ReactMock = require('react');
  const {View} = require('react-native');
  return class Swipeable extends ReactMock.Component {
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
  };
});

// Mocking Animated.timing
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = (value, config) => ({
    start: callback => {
      value.setValue(config.toValue);
      if (callback) {
        callback();
      }
    },
  });
  return RN;
});

const mockTask = {
  id: '1',
  task: 'Test Task',
  done: false,
  createdAt: new Date().toISOString(),
};

describe('Task Component', () => {
  it('renders correctly for a pending task', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Task
            item={mockTask}
            handleLeft={jest.fn()}
            handleRight={jest.fn()}
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
        <ThemeProvider theme={theme}>
          <Task
            item={completedTask}
            handleLeft={jest.fn()}
            handleRight={jest.fn()}
          />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
