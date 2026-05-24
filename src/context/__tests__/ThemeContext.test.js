import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {ThemeContextProvider, useAppTheme} from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'react-native';

const TestComponent = () => {
  const {themeName, toggleTheme} = useAppTheme();
  return (
    <>
      <Text testID='theme-name'>{themeName}</Text>
      <Button title='Toggle' onPress={toggleTheme} testID='toggle-button' />
    </>
  );
};

describe('ThemeContext', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('should provide light theme by default', async () => {
    let root;
    await act(async () => {
      root = renderer.create(
        <ThemeContextProvider>
          <TestComponent />
        </ThemeContextProvider>,
      );
    });

    const themeText = root.root.findByProps({testID: 'theme-name'});
    expect(themeText.props.children).toBe('light');
  });

  it('should toggle theme and persist it', async () => {
    let root;
    await act(async () => {
      root = renderer.create(
        <ThemeContextProvider>
          <TestComponent />
        </ThemeContextProvider>,
      );
    });

    const toggleButton = root.root.findByProps({testID: 'toggle-button'});

    await act(async () => {
      toggleButton.props.onPress();
    });

    const themeText = root.root.findByProps({testID: 'theme-name'});
    expect(themeText.props.children).toBe('dark');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@doit:theme', 'dark');
  });

  it('should load saved theme from storage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('dark');

    let root;
    await act(async () => {
      root = renderer.create(
        <ThemeContextProvider>
          <TestComponent />
        </ThemeContextProvider>,
      );
    });

    // Wait for useEffect to finish
    await act(async () => {
      await Promise.resolve();
    });

    const themeText = root.root.findByProps({testID: 'theme-name'});
    expect(themeText.props.children).toBe('dark');
  });
});
