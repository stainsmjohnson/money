import React, {useState, useEffect} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Button,
} from 'react-native-paper';
import {NavigationContainer, Theme} from '@react-navigation/native';

import {useAuth, AuthContext} from './src/utils/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

//routes
import RootNavigation from './src/routes/Drawer';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const {loading, user, signIn, signOut} = useAuth();
  const theme: Theme | any = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
  };

  if (loading) return <SplashScreen />;

  return (
    <AuthContext.Provider value={{user, signOut}}>
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
