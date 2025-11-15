"use client";
import Link from 'next/link';
import React from 'react'
import SignedIn from '../components/Signed-in';
import SignedOut from '../components/Signed-out';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
// import {iconFidgetSpinner} from '@tabler/icons-react';
import { signOut } from 'firebase/auth';


const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between">
    <div className="navbar-start">
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        
        </div>
        <a className="btn btn-ghost text-xl">Student Data Manager</a>
    </div>
    <div className="navbar-end">
      <SignedIn>
          <h1 className="text-4xl font-bold mb-4">Welcome, {user?.email}</h1>
          <button className="btn btn-neutral" onClick={() => signOut(auth)}>
            Sign Out
          </button>
      </SignedIn> 
      <SignedOut>
        <Link href={"../auth/signup"} className="btn mr-2">Sign Up</Link>
        <Link href={"../auth/login"} className="btn">Login</Link>
      </SignedOut>
    </div>
    </div>
  )
}

export default Header