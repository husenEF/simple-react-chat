import firebase from "firebase";

console.log({ proses: process.env });
const conf = {
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUHT_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROJECTID,
  measurementId: process.env.REACT_APP_MEASURERMENT_ID,
};

firebase.initializeApp(conf);

export const auth = firebase.auth;
export const db = firebase.database();
