import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from './firebase.js';

export const loginAdmin = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
export const logoutAdmin = () => signOut(firebaseAuth);
export const observeAuth = (callback) => onAuthStateChanged(firebaseAuth, callback);
export const authReady = new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => { unsubscribe(); resolve(user); });
});
export const getIdToken = async () => { const user = firebaseAuth.currentUser || await authReady; return user?.getIdToken() || null; };
