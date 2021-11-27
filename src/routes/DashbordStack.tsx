import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

//screens
import DashboardScreen from '../screens/Dashboard';
import NewTransactionScreen from '../screens/NewTransaction';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashbord" component={DashboardScreen} />
      <Stack.Screen
        name="NewTransaction"
        component={NewTransactionScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
