import React from 'react';
import {Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

//screens
import ScreenDashBoard from '../screens/HomeScreen';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ScreenDashBoard} />
      <Tab.Screen name="Settings">{() => <Text>Hello</Text>}</Tab.Screen>
    </Tab.Navigator>
  );
};
export default MyTabs;
