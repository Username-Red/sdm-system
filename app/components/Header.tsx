"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import ThemeBtn from "./ThemeBtn";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between">
      {/* Left Side */}
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Student Data Manager</a>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center gap-4">

        {user ? (
          <>
            <span className="font-semibold">Welcome, {user.email}</span>
            <button className="btn btn-neutral" onClick={() => signOut(auth)}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signup" className="btn mr-2">Sign Up</Link>
            <Link href="/auth/login" className="btn">Login</Link>
          </>
        )}
        <ThemeBtn />
      </div>
    </div>
  );
};

export default Header;
