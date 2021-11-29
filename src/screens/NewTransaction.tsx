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
  value: 'EARN' | 'SPEND' | 'HOLD' | 'FUTURE' | 'LOAN';
  disabled?: boolean;
};

const NewTransaction: React.FC<Screen> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<any>({
    title: 'Spend',
    value: 'SPEND',
    icon: (
      <FontAwesome5
        name="hand-holding-usd"
        size={40}
        color={theme.colors.text}
      />
    ),
  });
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const data: Data[] = [
    {
      title: 'Hold',
      value: 'HOLD',
      disabled: false,
    },
    {
      title: 'Spend',
      value: 'SPEND',
      disabled: false,
    },
    {
      title: 'Earn',
      value: 'EARN',
      disabled: false,
    },
    {
      title: 'Future',
      value: 'FUTURE',
      disabled: false,
    },
    {
      title: 'Borrow',
      value: 'LOAN',
      disabled: false,
    },
  ];
  const ICONS = {
    EARN: (
      <MaterialCommunityIcons
        name="cash-plus"
        size={40}
        color={theme.colors.text}
      />
    ),
    SPEND: (
      <FontAwesome5
        name="hand-holding-usd"
        size={40}
        color={theme.colors.text}
      />
    ),
    HOLD: <Ionicons name="pause-circle" size={40} color={theme.colors.text} />,
    FUTURE: (
      <FontAwesome5 name="user-clock" size={40} color={theme.colors.text} />
    ),
    LOAN: (
      <MaterialCommunityIcons
        name="cash-refund"
        size={40}
        color={theme.colors.text}
      />
    ),
  };

  const saveDetails = () => {
    const transaction: Transaction = {
      title,
      amount: Number(amount),
      currency: 'INR',
      timestamp: new Date().getTime(),
      type: selectedType.value,
    };
    add(transaction);
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
            value: 'SPEND',
          })),
        ]}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => {
          const isRowStart = index % 3 == 0;
          const selected = selectedType?.title === item.title;

          if (item.disabled)
            return (
              <View
                style={{
                  backgroundColor: 'transparant',
                  flex: 1,
                  height: 100,
                  marginLeft: isRowStart ? 0 : 16,
                }}></View>
            );
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
                    {ICONS[item.value]}
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
              value={title}
              onChangeText={setTitle}
              style={{ marginBottom: 16 }}
            />

            <TextInput
              mode="outlined"
              label="Amount"
              onChangeText={setAmount}
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
