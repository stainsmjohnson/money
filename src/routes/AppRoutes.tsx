import React from 'react';
import {Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

//screens
import ScreenDashBoard from '../screens/HomeScreen';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Transaction">
      <Tab.Screen name="Dashboard">{() => <Text>Hello</Text>}</Tab.Screen>
      <Tab.Screen name="Transaction" component={ScreenDashBoard} />
    </Tab.Navigator>
  );
};
export default MyTabs;
