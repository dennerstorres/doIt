import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from './context/ThemeContext';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import History from './pages/History';
import ErrorBoundary from './components/ErrorBoundary';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Statistics' component={Statistics} />
              <Stack.Screen name='History' component={History} />
            </Stack.Navigator>
          </NavigationContainer>
        </ErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
