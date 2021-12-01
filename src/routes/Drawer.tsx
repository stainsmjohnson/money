import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Divider, useTheme } from 'react-native-paper';
//screens
import SplashScreen from '../screens/SplashScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
//routers
import TabNavigator from './AppRoutes';
import { View } from 'react-native';
import { useAuth } from '../utils/auth';
import { User } from '../types';

const Drawer = createDrawerNavigator();

const Cover: React.FC<{ user: User | null }> = ({ user }) => {
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <View>
        <Avatar.Image source={{ uri: user?.photoURL }} size={70} />
        <Title>{user?.displayName}</Title>
        <Caption>{user?.email}</Caption>
      </View>
    </View>
  );
};

const CustomDrawerContent: React.FC<any> = (props: any) => {
  const { user, signOut } = useAuth();

  const screens = [
    {
      label: 'Home',
      name: 'Home',
      icon: 'home',
    },
    {
      label: 'Settings',
      name: 'Settings',
      icon: 'settings',
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <Cover user={user} />
      <Divider />

      {screens.map(screen => (
        <DrawerItem
          key={screen.name}
          label={screen.label}
          icon={props => <Ionicons {...props} name={screen.icon} />}
          onPress={() => props.navigation.jumpTo(screen.name)}
        />
      ))}

      <Divider />
      <DrawerItem
        label="Signout"
        icon={props => <Ionicons {...props} name="log-out" />}
        onPress={signOut}
      />
    </DrawerContentScrollView>
  );
};

const MyDrawer: React.FC = () => {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation: { toggleDrawer } }) => ({
        drawerType: 'slide',
        headerLeft: () => (
          <Ionicons
            name="menu-outline"
            onPress={toggleDrawer}
            style={{
              paddingHorizontal: 16,
            }}
            size={30}
            color={theme.colors.text}
          />
        ),
      })}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Settings" component={SplashScreen} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
