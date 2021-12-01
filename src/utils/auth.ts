import React, { useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import reactotron from 'reactotron-react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContextType, User } from '../types/index';

const COLLECTIONS = {
  USER: 'User',
  TRANSACTIONS: 'Transactions',
};

const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = React.createContext<AuthContextType>(defaultContext);

export const getAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged: any = (user: User | null) => {
    reactotron.log?.('AUTH STATE CHANGED :-', user?.displayName);
    setUser(user);
    if (loading) setLoading(false);
  };

  const signIn = async () => {
    const CLIENT_ID =
      '677402403431-h1cr01re1tuj078tqc5i036hnsooloip.apps.googleusercontent.com';
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
    });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const status = await auth().signInWithCredential(googleCredential);

    if (status.additionalUserInfo?.isNewUser) {
      //add to users collection
      try {
        const { displayName, email, phoneNumber, photoURL, uid } = status.user;
        const addedUser = await firestore()
          .collection(COLLECTIONS.USER)
          .doc(uid)
          .set({
            displayName,
            email,
            phoneNumber,
            photoURL,
            uid,
            transactions: firestore()
              .collection(COLLECTIONS.TRANSACTIONS)
              .doc(uid),
          });
        reactotron.log?.('User added!', addedUser);
      } catch (err: any) {
        reactotron.log?.('ERROR: ', err.message);
      }
    }

    return;
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => reactotron.log?.('User signed out!'));
  };

  useEffect(() => {
    reactotron.log?.('CHECKING AUTHENTICATION');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    user,
    loading,
    signIn,
    signOut,
  };
};

export const useAuth: () => AuthContextType = () => {
  const user: AuthContextType = useContext(AuthContext);
  return user;
};
