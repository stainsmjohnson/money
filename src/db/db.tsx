import firestore from '@react-native-firebase/firestore';
import { Transaction } from '../types';

export const add = async (data: Transaction) => {
  try {
    await firestore().collection('Transactions').add(data);

    console.log('User added!');
  } catch (err) {
    console.log('ERROR: ', err.message);
  }
};

//READ
// const usersCollection = firestore().collection('Users');

// Get user document with an ID of ABC
// const userDocument = firestore().collection('Users').doc('ABC');

//ONE TIME
//const users = await firestore().collection('Users').get();
//   console.log('Total users: ', querySnapshot.size);
//   querySnapshot.forEach(documentSnapshot => {
//     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//   })\

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
