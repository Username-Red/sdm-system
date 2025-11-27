"use client";
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'
import SignedIn from './components/Signed-in';
import SignedOut from './components/Signed-out';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth, database } from './firebase/config';
 
// Firestore "tutorial" code to get document
 
// Import Firestore functions
import { getFirestore, doc, setDoc, getDoc, DocumentReference } from "firebase/firestore";
import SignIn from './auth/login/page';
 
// use doc to create a reference to the document, eg: doc(datbase, collection, documentID)
const docRef = doc(database, "students", "3D9FVGr0i4YUxQ7SOfsH"); // collection "students", doc "3D9FVGr0i4YUxQ7SOfsH", should fetch "Marcus"
// use getDoc to fetch the document snapshot
const docSnap = await getDoc(docRef);
 
const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signingOut, signOutError] = useSignOut(auth);
 
  // When login is being checked
  if (loading) {
    return <p >Checking Login...</p>;
  }
 
  // If user is not logged in, show the login form
  if (!user) {
  return (
    <>
    <div>
      <h1>Welcome to Student Data Management System</h1>
      <p>Please Login to Manage Student Records</p>
      <p>{}</p>
      </div>
     
      <div className='mt-4'>
        <SignIn />
      </div>
     
    <p className="mt-4">
          Don't have an account?  
          <Link href="/signup" className="underline text-blue-600">Sign up</Link>
        </p>
      </>
    );
  }
 
  // Loggin and have access to student data
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <p className="mt-2">You are logged in.</p>
 
      <Link href="/students" className="btn btn-primary mt-4">
        Go to Student Records
      </Link>
    </div>
  );
}
 
export default Home