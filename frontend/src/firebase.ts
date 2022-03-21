import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as out,
} from "firebase/auth";

interface User {
  name: string;
  email: string;
  avatar: string;
  uid: string;
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMLFqNlUpqsgb47vPHxVZvjT8h-ig0Tlg",
  authDomain: "artur-341319.firebaseapp.com",
  projectId: "artur-341319",
  // storageBucket: "artur-341319.appspot.com",
  messagingSenderId: "1028837496303",
  appId: "1:1028837496303:web:02dc566d3b9cf245e9521a",
  measurementId: "G-9HG5HZ7ZMR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<User> => {
  console.log("signInWithGoogle");
  const user = await (await signInWithPopup(auth, provider)).user;
  if (user && user.displayName && user.email && user.photoURL && user.uid) {
    return {
      name: user?.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
    };
  } else {
    throw new Error("User is not defined");
  }
};

const signUpWithGithub = async (): Promise<User> => {
  const user = await (
    await signInWithPopup(auth, new GithubAuthProvider())
  ).user;
  if (user) {
    return {
      name: user.displayName ? user.displayName : "",
      email: user.email ? user.email : "",
      avatar: user.photoURL ? user.photoURL : "",
      uid: user.uid ? user.uid : "",
    };
  } else {
    throw new Error("User is not defined");
  }
};

const signOut = async () => {
  return await out(auth);
};

export { signInWithGoogle, signOut, app, auth, provider, signUpWithGithub };
