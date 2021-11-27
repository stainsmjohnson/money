import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import {
  TouchableRipple,
  Title,
  Caption,
  Text,
  useTheme,
  Card,
} from 'react-native-paper';

type TransactionType = {
  key: string;
  title: string;
  amount: number;
  currency: string;
  date: string;
  isLoss: boolean;
};

const colors = {
  loss: '#f64332',
  profit: '#58C511',
};

const Transactions = ({ navigation }) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const tempData = [];
    for (let i = 0; i < 50; i++) {
      tempData.push({
        key: i.toString(),
        title: 'Gift to Anna' + i,
        amount: 1895,
        currency: 'INR',
        date: '12/11/2021 12:15 AM',
        isLoss: i % 2 == 0,
      });
    }
    setTransactions(tempData);
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
  isLoss: boolean;
  amount: number;
  toggleModal: () => void;
}> = ({ title, amount, isLoss, toggleModal }) => {
  const theme = useTheme();
  console.log(theme.colors);
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
            backgroundColor: isLoss ? colors.loss : colors.profit,
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
              12th November 2021, 10:34 am
            </Caption>
          </View>
          <View>
            <Text
              style={{
                backgroundColor: `${isLoss ? colors.loss : colors.profit}22`,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: isLoss ? colors.loss : colors.profit,
                borderRadius: 15,
                color: isLoss ? colors.loss : colors.profit,
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

const styles = StyleSheet.create({});
