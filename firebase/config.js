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

export default firebase.initializeApp(firebaseConfig);
