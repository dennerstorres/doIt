import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import theme from '../../../theme';
import DailyProgress from '../index';

describe('DailyProgress', () => {
  it('renders correctly with given progress', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <DailyProgress progress={75} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
