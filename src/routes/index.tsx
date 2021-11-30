import React from 'react';
import NonAuthScreens from '../screens/Signin';
import AuthScreens from '../routes/Drawer';
import SplashScreen from '../screens/SplashScreen';
import { useAuth } from '../utils/auth';

const RootNavigation = () => {
  const auth = useAuth();

  if (auth?.loading) return <SplashScreen />;
  if (!!auth?.user) return <AuthScreens />;
  return <NonAuthScreens />;
};

export default RootNavigation;
