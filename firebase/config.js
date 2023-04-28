import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyALHBryuMpFyKC7F-WZKbRybIlvQ4nnqYE',
  authDomain: 'travel-app-3e5e5.firebaseapp.com',
  projectId: 'travel-app-3e5e5',
  storageBucket: 'travel-app-3e5e5.appspot.com',
  messagingSenderId: '990650815168',
  appId: '1:990650815168:web:58ca4878495f8e48a5d325',
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyCIOVQjMbhMvl5nf_jjDJWEaM8kwJP104w',
//   authDomain: 'react-native-1-dbc7b.firebaseapp.com',
//   projectId: 'react-native-1-dbc7b',
//   storageBucket: 'react-native-1-dbc7b.appspot.com',
//   messagingSenderId: '1032799476282',
//   appId: '1:1032799476282:web:a9a61b00861b239647b303',
// };

export default firebase.initializeApp(firebaseConfig);
