import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfiguration = {
  apiKey: 'AIzaSyCukzXnPUBXARLloFWK8_72Y4aryTegW1A',
  authDomain: 'https://almond-re.firebaseio.com',
  databaseURL: 'https://almond-re.firebaseio.com',
  storageBucket: 'gs://almond-re.appspot.com/',
};
firebase.initializeApp(firebaseConfiguration);

export const firebaseDatabase = firebase.database();
