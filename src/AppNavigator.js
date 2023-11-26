import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Task from './Task';
import Home from './Home';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name={'Home'}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Task}
          name={'AddUser'}
          options={{
            title:"Student's Bio-Data"  
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;