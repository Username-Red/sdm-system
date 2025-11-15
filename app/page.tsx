"use client";
import Link from 'next/link';
import React from 'react'
import SignedIn from './components/Signed-in';
import SignedOut from './components/Signed-out';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import {iconFidgetSpinner} from '@tabler/icons-react';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signingOut, signOutError] = useSignOut(auth);



  return (
    <>
    <div>
      <h1>Welcome to Student Data Management System</h1>
      <p>Manage student records table coming soon</p>
    </div>
    </>
  )
}

export default Home