import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import Header from '../index';
import theme from '../../../theme';
import {ThemeContextProvider} from '../../../context/ThemeContext';

describe('Header Component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeContextProvider>
          <ThemeProvider theme={theme}>
            <Header />
          </ThemeProvider>
        </ThemeContextProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
