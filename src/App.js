import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'styled-components/native';

import {ThemeContextProvider, useAppTheme} from './context/ThemeContext';

/**
 * Importação de páginas
 */
import Home from './pages/Home';
/** */

const Stack = createStackNavigator();

function Navigation() {
  const {theme} = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <Navigation />
    </ThemeContextProvider>
  );
}

export default App;
