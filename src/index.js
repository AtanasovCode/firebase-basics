import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore'
import {
  getAuth,
} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBv8_kXlTABhgWR9xfAbz8z0wyuAarpSeo",
  authDomain: "fir-app-7825e.firebaseapp.com",
  projectId: "fir-app-7825e",
  storageBucket: "fir-app-7825e.appspot.com",
  messagingSenderId: "215741555944",
  appId: "1:215741555944:web:4609c03864f426dcb4d55d",
  measurementId: "G-SMS3MMG4GT"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, 'books');

/*
* Queries
* where('author', '==', 'Stephen King'),
* This function finds specific data
* We tell it to look inside of the colRef which references our book collection
* The where() function takes 3 arguements: 
    1. What field to search for
    2. A comparison sign like equals to or doesn't equal to
    3. What it needs to look for (name, number, title, etc...)
*/

//Search for a author who's name equals Stephen King
const q = query(colRef, orderBy('createdAt', 'asc'));

/*  
* This only runs once
* So we need to refresh the page in order to see the updated database
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch((error) => {
    console.log(error.message);
  })
*/

/*
* This runs every single time there is an update to the database
* No need to refresh the page to see the updated list 
*/
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  })
  console.log(books);
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      colRef={colRef}
      db={db}
      auth={auth}
    />
  </React.StrictMode>
);