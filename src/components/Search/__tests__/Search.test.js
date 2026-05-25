import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Search from '../index';
import theme from '../../../theme';

const renderWithTheme = component => {
  return renderer.create(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
  );
};

describe('Search Component', () => {
  it('renders correctly', () => {
    const tree = renderWithTheme(
      <Search value='' onChangeText={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with value and shows clear button', () => {
    const tree = renderWithTheme(
      <Search value='test' onChangeText={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onChangeText when typing', () => {
    const onChangeTextMock = jest.fn();
    const testRenderer = renderWithTheme(
      <Search value='' onChangeText={onChangeTextMock} />,
    );
    const input = testRenderer.root.findByType('TextInput');

    act(() => {
      input.props.onChangeText('new search');
    });

    expect(onChangeTextMock).toHaveBeenCalledWith('new search');
  });

  it('calls onChangeText with empty string when clear button is pressed', () => {
    const onChangeTextMock = jest.fn();
    const testRenderer = renderWithTheme(
      <Search value='test' onChangeText={onChangeTextMock} />,
    );

    const clearButton = testRenderer.root.findByProps({
      testID: 'search-clear-button',
    });

    act(() => {
      clearButton.props.onPress();
    });

    expect(onChangeTextMock).toHaveBeenCalledWith('');
  });
});
