"use client";
import Link from 'next/link';
import React from 'react'
import SignedIn from './components/Signed-in';
import SignedOut from './components/Signed-out';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth, database } from './firebase/config';

// Firestore "tutorial" code to get document

// Import Firestore functions
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// use doc to create a reference to the document, eg: doc(datbase, collection, documentID)
const docRef = doc(database, "students", "3D9FVGr0i4YUxQ7SOfsH"); // collection "students", doc "3D9FVGr0i4YUxQ7SOfsH", should fetch "Marcus"
// use getDoc to fetch the document snapshot
const docSnap = await getDoc(docRef);

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signingOut, signOutError] = useSignOut(auth);

  // Check if document exists
  if (docSnap.exists()) {
    // Document data found, you can use it
    console.log(docSnap.data());
  } 
  // Document does not exist
  else {
    // doc.data() will be undefined in this case, so log no document
    console.log("No such document!");
  }

  // tutorial complete


  return (
    <>
    <div>
      <h1>Welcome to Student Data Management System</h1>
      <p>Manage student records table coming soon</p>
      <p>{}</p>
    </div>
    </>
  )
}

export default Home