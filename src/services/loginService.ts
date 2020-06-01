import firebase from './firebase';

export const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

export const isLoggedIn = () => !!firebase.auth().currentUser;
