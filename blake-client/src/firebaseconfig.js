import * as firebase from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyB9npsDCbvjvk04W8oH9WfYYfRZknFN1j8",
  authDomain: "blake-e550d.firebaseapp.com",
  databaseURL: "https://blake-e550d.firebaseio.com",
  projectId: "blake-e550d",
  storageBucket: "",
  messagingSenderId: "499728572938",
  appId: "1:499728572938:web:f04f57307e1f5d5a"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
