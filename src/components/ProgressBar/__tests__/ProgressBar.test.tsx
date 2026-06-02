import React from 'react';
import renderer from 'react-test-renderer';
import {ThemeProvider} from 'styled-components/native';
import theme from '../../../theme';
import ProgressBar from '../index';

describe('ProgressBar', () => {
  it('renders correctly with given progress', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <ProgressBar progress={50} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('clamps progress between 0 and 100', () => {
    const tree150 = renderer.create(
      <ThemeProvider theme={theme}>
        <ProgressBar progress={150} />
      </ThemeProvider>,
    ).toJSON();
    // With styled-components, we rely on snapshots to verify the styles are applied correctly
    // because accessing props.style on the rendered component is tricky in the test renderer
    expect(tree150).toMatchSnapshot('progress-150');

    const treeMinus50 = renderer.create(
      <ThemeProvider theme={theme}>
        <ProgressBar progress={-50} />
      </ThemeProvider>,
    ).toJSON();
    expect(treeMinus50).toMatchSnapshot('progress-minus-50');
  });
});
