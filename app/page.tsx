"use client";
import Link from 'next/link';
import React from 'react'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth, database } from './firebase/config';

import { doc, getDoc } from "firebase/firestore";
import SignIn from './auth/login/page';

// Firestore document example
const docRef = doc(database, "students", "3D9FVGr0i4YUxQ7SOfsH");
const docSnap = await getDoc(docRef);

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-lg">Checking Login...</p>
      </div>
    );
  }

  if (!user) {
    const userdude = auth.currentUser;

    if (userdude) console.log("User is signed in:", userdude.email);
    else console.log("No user is signed in.");

    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-base-100">
        <h1 className="text-base-content/70 text-3xl font-bold">Welcome to Student Data Management System</h1>
        <p className="text-base-content/70 mt-2 text-lg">Please Login to Manage Student Records</p>

        <div className="mt-6 w-full max-w-sm">
          <SignIn />
        </div>

        <p className="mt-6 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="underline text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-base-200">
      <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
      <p className="mt-2 text-lg">You are logged in.</p>

      <Link href="/students" className="btn btn-primary mt-6">
        Go to Student Records
      </Link>
    </div>
  );
};

export default Home;
