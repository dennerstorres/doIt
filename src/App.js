import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Importação de páginas
 */
import Home from './pages/Home';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={
          {
            title: 'Tarefas'
          }
        } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;