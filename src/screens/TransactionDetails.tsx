import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const TransactionDetails = () => {
  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 4, padding: 16 }}>
      <Text>Title Something</Text>
      <Text>
        this is a description transaction done foe the actiion description
      </Text>
      <Text>+incoming money</Text>
      <Text>$ 1205/-</Text>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({});
