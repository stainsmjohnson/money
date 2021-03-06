import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Title, Caption, Text, Card } from 'react-native-paper';
import { Screen, TransactionResponse, TransactionType } from '../types';
import { useAuth } from '../utils/auth';
import firestore from '@react-native-firebase/firestore';
import reactotron from 'reactotron-react-native';

const colors = {
  SPEND: '#f64332',
  EARN: '#58C511',
  HOLD: '#00FFFF',
  FUTURE: '#FFBB00',
  LOAN: '#FF0000',
};

const Transactions: React.FC<Screen> = ({ navigation }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    return firestore()
      .collection('Transactions')
      .doc(user?.uid)
      .onSnapshot(querySnapshot => {
        const allTransactions: any[] = querySnapshot.data()?.transactions || [];
        setTransactions(allTransactions);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={transactions}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Transaction
            {...item}
            toggleModal={() => navigation.navigate('TransactionDetails')}
          />
        )}
      />
    </View>
  );
};

const Transaction: React.FC<{
  title: string;
  amount: number;
  timestamp: number;
  type: TransactionType;
  toggleModal: () => void;
}> = ({ title, amount, type, timestamp, toggleModal }) => {
  const color = colors[type];
  return (
    <Card
      onPress={toggleModal}
      style={{
        marginBottom: 16,
        overflow: 'hidden',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 10,
            backgroundColor: color,
          }}></View>
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            <Title style={{ fontSize: 14 }}>{title}</Title>
            <Caption style={{ fontSize: 10 }}>
              {new Date(timestamp).toLocaleString()}
            </Caption>
          </View>
          <View>
            <Text
              style={{
                backgroundColor: `${color}22`,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: color,
                borderRadius: 15,
                color: color,
                fontSize: 12,
              }}>
              {amount}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default Transactions;
