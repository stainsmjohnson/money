import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const Signin = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signin screen</Text>
      <Button>Signin</Button>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({});
