import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: 'AIzaSyDOP6xNsfA3o3Oi2QHMQPah9GA3guKMMLI',
    authDomain: 'myshare-6b727.firebaseapp.com',
    projectId: 'myshare-6b727',
    storageBucket: 'myshare-6b727.appspot.com',
    messagingSenderId: '767096704352',
    appId: '1:767096704352:web:c22257f46074a491d4a205',
});
// const db = firebase.firestore();
export default app;
// const auth = firebase.auth();
// export { auth };
// export { firebase };
// export default db;
