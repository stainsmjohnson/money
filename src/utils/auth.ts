import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const AuthContext = React.createContext<{user:User | null,signOut:() => void}>({user:null,signOut:() => {}});

export type User = {
  displayName: string;
  email: string;
  phoneNumber: any;
  photoURL: string;
  uid: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  // Set an initializing state whilst Firebase connects
  const [loading, setLoading] = useState(true);

  // Handle user state changes
  const onAuthStateChanged: any = (user: User | null) => {
    console.log('AUTH STATE CHANGED :-', user?.displayName);
    setUser(user);
    if (loading) setLoading(false);
  };

  const signIn = async () => {
    const CLIENT_ID =
      '677402403431-h1cr01re1tuj078tqc5i036hnsooloip.apps.googleusercontent.com';
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
    });
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    console.log('CHECKING AUTHENTICATION')
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    user,
    loading,
    signIn,
    signOut
  };
};

