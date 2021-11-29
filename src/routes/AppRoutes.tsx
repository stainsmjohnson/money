import React from 'react';
import { Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import TransactionsScreen from '../screens/Transactions';

//routes
import DashbordStack from './DashbordStack';
import TransactionStack from './TransactionStack';

const Tab = createMaterialBottomTabNavigator();

const TAB_ICONS: any = {
  DashboardStack: {
    active: 'grid',
    inactive: 'grid-outline',
  },
  TransactionStack: {
    active: 'layers',
    inactive: 'layers-outline',
  },
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Transaction"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          const icons = TAB_ICONS[route.name];
          const icon = focused ? icons.active : icons.inactive;
          return <Ionicons name={icon} color={color} size={20} />;
        },
      })}>
      <Tab.Screen name="DashboardStack" component={DashbordStack} />
      <Tab.Screen name="TransactionStack" component={TransactionStack} />
    </Tab.Navigator>
  );
};
export default MyTabs;
