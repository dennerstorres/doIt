import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Header from '../index';
import theme from '../../../theme';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        // @ts-ignore
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to History when history button is pressed', () => {
    const component = renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <Header showHistoryButton />
      </ThemeProvider>,
    );
    const historyButton = component.root.findByProps({
      testID: 'header-history-button',
    });
    historyButton.props.onPress();
    expect(mockNavigate).toHaveBeenCalledWith('History');
  });

  it('navigates to Statistics when stats button is pressed', () => {
    const component = renderer.create(
      // @ts-ignore
      <ThemeProvider theme={theme}>
        <Header showStatsButton />
      </ThemeProvider>,
    );
    const statsButton = component.root.findByProps({
      testID: 'header-stats-button',
    });
    statsButton.props.onPress();
    expect(mockNavigate).toHaveBeenCalledWith('Statistics');
  });
});
