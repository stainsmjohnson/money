import firestore from '@react-native-firebase/firestore';
import { Transaction } from '../types';

const COLLECTION = 'Transactions';

export const add = async (data: Transaction) => {
  try {
    await firestore().collection(COLLECTION).add(data);
    console.log('Transaction added!');
  } catch (err: any) {
    console.log('ERROR: ', err.message);
  }
};

//READ
// const usersCollection = firestore().collection('Users');

// Get user document with an ID of ABC
// const userDocument = firestore().collection('Users').doc('ABC');

//ONE TIME
export const getAllTransactions = async () => {
  try {
    const transactions = await firestore().collection(COLLECTION).get();
    const transformedTransactions: any[] = [];
    console.log('Total transactions: ', transactions.size);
    transactions.forEach(documentSnapshot => {
      transformedTransactions.push({
        key: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });

    return transformedTransactions;
  } catch (err) {
    console.log('#err', err);
  }
};

// //const user = await firestore().collection('Users').doc('ABC').get();
//   console.log('User exists: ', documentSnapshot.exists);
//   if (documentSnapshot.exists) {
//     console.log('User data: ', documentSnapshot.data());
//   }

//REALTIME
// function onResult(QuerySnapshot) {
//   console.log('Got Users collection result.');
// }

// function onError(error) {
//   console.error(error);
// }

// firestore().collection('Users').onSnapshot(onResult, onError);
