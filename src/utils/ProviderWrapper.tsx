import React from 'react';
import { useColorScheme } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperLightTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import { AuthContext, getAuth } from './auth';
import SplashScreen from '../screens/SplashScreen';

const lighttheme = {
  ...NavigationLightTheme,
  ...PaperLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    ...PaperLightTheme.colors,
    primary: 'tomato',
  },
};
const darktheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: 'tomato',
  },
};

const ProviderWrapper: React.FC = ({ children }) => {
  const isDarkMode = useColorScheme() == 'dark';
  const { loading, user, signIn, signOut } = getAuth();

  const theme = isDarkMode ? darktheme : lighttheme;

  const linking = {
    prefixes: [],
    getInitialURL: async () => {
      await new Promise(resolve => setTimeout(() => resolve(true), 200));
      return null;
    },
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signIn }}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          theme={theme}
          fallback={<SplashScreen />}
          linking={linking}>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default ProviderWrapper;
