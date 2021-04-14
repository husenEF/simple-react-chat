import { auth } from "../services/firebase";

export const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export const logout = () => auth().signOut();
