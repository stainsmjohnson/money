import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, View, Animated } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen, Transaction } from '../types';
import { add } from '../db/db';

type Data = {
  title: string;
  disabled?: boolean;
  icon: React.ReactNode | undefined;
};

const NewTransaction: React.FC<Screen> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<Data | null>(null);
  const data: Data[] = [
    {
      title: 'Hold',
      icon: (
        <Ionicons name="pause-circle" size={40} color={theme.colors.text} />
      ),
    },
    {
      title: 'Spend',
      icon: (
        <FontAwesome5
          name="hand-holding-usd"
          size={40}
          color={theme.colors.text}
        />
      ),
    },
    {
      title: 'Earn',
      icon: (
        <MaterialCommunityIcons
          name="cash-plus"
          size={40}
          color={theme.colors.text}
        />
      ),
    },
    {
      title: 'Future',
      icon: (
        <FontAwesome5 name="user-clock" size={40} color={theme.colors.text} />
      ),
    },
    {
      title: 'Borrow',
      icon: (
        <MaterialCommunityIcons
          name="cash-refund"
          size={40}
          color={theme.colors.text}
        />
      ),
    },
  ];

  const saveDetails = () => {
    const transaction: Transaction = {
      title: 'asdasd',
      amount: 100,
      currency: 'INR',
      timestamp: 39879234234,
      type: 'EARN',
    };
    add(transaction);
    Alert.alert('Saved' + JSON.stringify(transaction, null, ' '));
    navigation.pop();
  };
  return (
    <>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        keyExtractor={item => item.title}
        data={[
          ...data,
          ...Array.from({ length: 3 - (data.length % 3) }).map((_, k) => ({
            disabled: true,
            title: k + data.length + '',
            icon: '',
          })),
        ]}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => {
          const isRowStart = index % 3 == 0;
          const selected = selectedType?.title === item.title;
          return (
            <View
              style={{
                backgroundColor: 'transparant',
                flex: 1,
                height: 100,
                marginLeft: isRowStart ? 0 : 16,
              }}>
              {!item.disabled && (
                <Card
                  onPress={() => setSelectedType(item)}
                  style={{
                    height: '100%',
                    overflow: 'hidden',
                  }}
                  mode={'elevated'}>
                  <Animated.View
                    style={{
                      height: '100%',
                      backgroundColor: selected
                        ? theme.colors.accent
                        : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.icon}
                    <Text>{item.title}</Text>
                  </Animated.View>
                </Card>
              )}
            </View>
          );
        }}
        numColumns={3}
        ListHeaderComponent={
          <View>
            <Text style={{ marginBottom: 16 }}>Add new trabsactuib</Text>
            <TextInput
              mode="outlined"
              label="Title"
              style={{ marginBottom: 16 }}
            />

            <TextInput
              mode="outlined"
              label="Amount"
              style={{ flex: 1, marginBottom: 16 }}
              keyboardType="numeric"
            />
          </View>
        }
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 16,
        }}>
        <Button
          mode="outlined"
          style={{ marginRight: 16 }}
          onPress={() => navigation.pop()}>
          Cancel
        </Button>
        <Button mode="contained" onPress={saveDetails}>
          Save
        </Button>
      </View>
    </>
  );
};

export default NewTransaction;

const styles = StyleSheet.create({});
