import React, {useState, useEffect} from 'react';
import {
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
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

//routes
import RootNavigation from './src/routes/AppRoutes';

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
  };

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log('AUTH STATE CHANGED');

    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    console.log('APP STARTED IN USEFFECT');

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signin = async () => {
    try {
      const CLIENT_ID =
        '677402403431-h1cr01re1tuj078tqc5i036hnsooloip.apps.googleusercontent.com';
      GoogleSignin.configure({
        webClientId: CLIENT_ID,
      });
      await new Promise(resolve => setTimeout(() => resolve(true), 5000));
      // Get the users ID token

      const {idToken} = await GoogleSignin.signIn();
      console.log('>>>', idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.error(err);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Button onPress={signin}>Signin</Button>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
