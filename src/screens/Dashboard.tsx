import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, FAB } from 'react-native-paper';

const Dashboard = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Dashbasdasdoard</Text>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
});