import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperLightTheme,
  DarkTheme as PaperDarkTheme,
  Button,
} from 'react-native-paper';
import {
  NavigationContainer,
  Theme,
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { useAuth, AuthContext } from './src/utils/auth';

//routes
import RootNavigation from './src/routes/Drawer';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const isDarkMode = useColorScheme() == 'dark';
  const { loading, user, signIn, signOut } = useAuth();
  const lighttheme: Theme | any = {
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

  if (loading) return <SplashScreen />;

  const theme = isDarkMode ? darktheme : lighttheme;
  return (
    <AuthContext.Provider value={{ user, signOut }}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          theme={theme}
          fallback={<SplashScreen />}
          linking={{
            prefixes: [],
            getInitialURL: async () => {
              await new Promise(resolve =>
                setTimeout(() => resolve(true), 500),
              );
              return null;
            },
          }}>
          {!user ? (
            <View>
              <Text>Login</Text>
              <Button onPress={signIn}>Signin</Button>
            </View>
          ) : (
            <RootNavigation />
          )}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default App;
