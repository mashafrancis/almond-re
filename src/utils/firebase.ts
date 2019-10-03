import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCukzXnPUBXARLloFWK8_72Y4aryTegW1A',
  authDomain: 'almond-re.firebaseapp.com',
  databaseURL: 'https://almond-re.firebaseio.com',
  projectId: 'almond-re',
  storageBucket: 'almond-re.appspot.com',
  messagingSenderId: '181012282167',
  appId: '1:181012282167:web:20c6848464031cdeb278b2',
  measurementId: 'G-MWCBWQ858C',
};

firebase.initializeApp(firebaseConfig);

export const auth: any = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export const firebaseDatabase = firebase.database();
