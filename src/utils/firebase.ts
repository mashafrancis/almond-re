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

export const userData = () => {
  const user = firebase.auth().currentUser;
  // tslint:disable-next-line:one-variable-per-declaration
  let name, email, photoUrl, uid, emailVerified;
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  return {
    name,
    email,
    photoUrl,
    emailVerified,
    uid,
  };
};
