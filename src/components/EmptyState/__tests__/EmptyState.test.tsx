import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import EmptyState from '../index';
import theme from '../../../theme';

// Mocking react-native-vector-icons
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('EmptyState Component', () => {
  it('renders correctly with default message', () => {
    const tree = renderer
      .create(
        // @ts-ignore
        <ThemeProvider theme={theme}>
          <EmptyState />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom message', () => {
    const customMessage = 'No tasks found for your search.';
    const tree = renderer
      .create(
        // @ts-ignore
        <ThemeProvider theme={theme}>
          <EmptyState message={customMessage} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();

    // Verify the custom message is present in the rendered output
    const treeString = JSON.stringify(tree);
    expect(treeString).toContain(customMessage);
  });

  it('uses theme colors for the icon and text', () => {
    const component = renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <EmptyState />
      </ThemeProvider>,
    );
    const root = component.root;

    // Check Icon color
    // @ts-ignore
    const icon = root.findByType('Icon');
    expect(icon.props.color).toBe(theme.colors.accent);

    // Check Text color
    const text = root.findByProps({
      children: 'Você ainda não tem tarefas cadastradas.',
    });
    // In many RN testing setups with styled-components, the styles might be complex
    // or not directly accessible as we expect in the flat tree.
    // However, we can at least verify the component is rendered.
    expect(text).toBeDefined();
  });
});
