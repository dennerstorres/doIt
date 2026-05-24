import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Home from '../index';
import theme from '../../../theme';

// Mocking storage to avoid side effects
jest.mock('../../../services/storage', () => ({
  saveTasks: jest.fn(),
  getTasks: jest.fn(),
}));

// Mock Task component to simplify testing logic
jest.mock('../../../components/Task', () => {
  const {TouchableOpacity, Text} = require('react-native');
  return ({item, handleLeft}) => (
    <TouchableOpacity testID={`task-${item.id}`} onPress={handleLeft}>
      <Text>{item.task}</Text>
    </TouchableOpacity>
  );
});

// Mock Header and AddTask to keep it simple
jest.mock('../../../components/Header', () => 'Header');
jest.mock('../../../components/AddTask', () => 'AddTask');

const renderWithTheme = component => {
  return renderer.create(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
  );
};

describe('Home Filter', () => {
  it('should filter tasks correctly', () => {
    let root;
    act(() => {
      root = renderWithTheme(<Home />);
    });

    const instance = root.root;

    // Wait for state updates in useEffect
    // act(() => {});

    // Find task-1
    const task1 = instance.findByProps({testID: 'task-1'});
    expect(task1).toBeTruthy();

    // Mark 'Fazer café' as done
    act(() => {
      task1.props.onPress();
    });

    // Find filter buttons
    const findFilterButton = text => {
      const textNodes = instance.findAll(
        el => el.type === 'Text' && el.props.children === text,
      );
      for (const textNode of textNodes) {
        let current = textNode;
        while (current && current.parent) {
          if (current.props && current.props.onPress) {
            return current;
          }
          current = current.parent;
        }
      }
      return null;
    };

    const allFilter = findFilterButton('Todas');
    const pendingFilter = findFilterButton('Pendentes');
    const doneFilter = findFilterButton('Concluídas');

    // Switch to 'Pendentes'
    act(() => {
      pendingFilter.props.onPress();
    });

    // Check filtered tasks
    const taskIds = instance
      .findAll(el => el.props.testID && el.props.testID.startsWith('task-'))
      .map(el => el.props.testID);

    expect(taskIds).not.toContain('task-1');
    expect(taskIds).toContain('task-2');
    expect(taskIds).toContain('task-3');

    // Switch to 'Concluídas'
    act(() => {
      doneFilter.props.onPress();
    });
    const taskIdsDone = instance
      .findAll(el => el.props.testID && el.props.testID.startsWith('task-'))
      .map(el => el.props.testID);
    expect(taskIdsDone).toContain('task-1');
    expect(taskIdsDone).not.toContain('task-2');
    expect(taskIdsDone).not.toContain('task-3');

    // Switch back to 'Todas'
    act(() => {
      allFilter.props.onPress();
    });
    const taskIdsAll = instance
      .findAll(el => el.props.testID && el.props.testID.startsWith('task-'))
      .map(el => el.props.testID);
    expect(taskIdsAll).toContain('task-1');
    expect(taskIdsAll).toContain('task-2');
    expect(taskIdsAll).toContain('task-3');
  });
});
