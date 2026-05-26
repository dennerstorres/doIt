import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Filters from '../index';
import theme from '../../../theme';

describe('Filters Component', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  const renderWithTheme = component => {
    return renderer.create(
      <ThemeProvider theme={theme}>{component}</ThemeProvider>,
    );
  };

  it('renders correctly with active filter "all"', () => {
    const tree = renderWithTheme(
      <Filters activeFilter='all' onFilterChange={mockOnFilterChange} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with active filter "pending"', () => {
    const tree = renderWithTheme(
      <Filters activeFilter='pending' onFilterChange={mockOnFilterChange} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onFilterChange when a filter button is pressed', () => {
    const component = renderWithTheme(
      <Filters activeFilter='all' onFilterChange={mockOnFilterChange} />,
    );
    const instance = component.root;

    // Find the 'pending' filter button
    const pendingButton = instance.findByProps({
      testID: 'filter-button-pending',
    });

    act(() => {
      pendingButton.props.onPress();
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith('pending');
  });

  it('shows active state for the selected filter', () => {
    const component = renderWithTheme(
      <Filters activeFilter='completed' onFilterChange={mockOnFilterChange} />,
    );
    const instance = component.root;

    const completedButton = instance.findByProps({
      testID: 'filter-button-completed',
    });
    const allButton = instance.findByProps({testID: 'filter-button-all'});

    expect(completedButton.props.active).toBe(true);
    expect(allButton.props.active).toBe(false);
  });
});
