import React, {createContext, useContext, useState, useEffect} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {light, dark, Theme} from '../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextData {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({children}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await AsyncStorage.getItem('@doit:theme');
      if (savedTheme) {
        setThemeMode(savedTheme as ThemeMode);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    await AsyncStorage.setItem('@doit:theme', newTheme);
  };

  const theme = themeMode === 'light' ? light : dark;

  return (
    <ThemeContext.Provider value={{theme, themeMode, toggleTheme}}>
      {/* @ts-ignore - ThemeProvider conflict with React 16 types */}
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
