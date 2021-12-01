import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../utils/auth';

const Signin = () => {
  const { signIn } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signin screen</Text>
      <Button onPress={signIn}>Signin</Button>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({});
