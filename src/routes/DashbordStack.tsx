import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import DashboardScreen from '../screens/Dashboard';
import NewTransactionScreen from '../screens/NewTransaction';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashbord" component={DashboardScreen} />
      <Stack.Screen name="NewTransaction" component={NewTransactionScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
