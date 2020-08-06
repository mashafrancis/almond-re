import * as firebase from 'firebase';
import 'firebase/auth';
import store from '../../store';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

// try{
//   firebase.initializeApp(firebaseConfig);
// } catch (e) {
//   console.log('Class: , Function: , Line 19 e():', e);
// }

const reactReduxFirebaseConfig = {
  userProfile: 'users',
};

// const reactReduxFirebaseProps = {
//   firebase: firebaseConfig,
//   dispatch: store.dispatch,
//   config: reactReduxFirebaseConfig
// }

export {
  firebaseConfig,
  // reactReduxFirebaseProps,
  reactReduxFirebaseConfig,
};
