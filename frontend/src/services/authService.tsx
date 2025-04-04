import { signInWithPopup, signOut, UserCredential, onAuthStateChanged as firebaseOnAuthStateChanged, User } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, googleProvider);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const getAuthToken = async (): Promise<string | null> => {
  return await auth.currentUser?.getIdToken() || null;
};