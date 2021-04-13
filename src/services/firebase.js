import firebase from "firebase";

const conf = {
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUHT_DOMAIN,
};

firebase.initializeApp(conf);

export const auth = firebase.auth;
export const db = firebase.database();
