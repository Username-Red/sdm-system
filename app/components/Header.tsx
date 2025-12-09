"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import ThemeBtn from "./ThemeBtn";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="navbar bg-base-100 text-base-content shadow-md px-4">
      {/* Left Side */}
      <div className="navbar-start">
        <span className="btn btn-ghost text-xl">
          Student Data Manager
        </span>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <>
            <span className="font-semibold">
              Welcome, {user.email}
            </span>
            <button
              className="btn btn-neutral"
              onClick={() => signOut(auth)}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signup" className="btn btn-primary">
              Sign Up
            </Link>
            <Link href="/auth/login" className="btn btn-secondary">
              Login
            </Link>
          </>
        )}

        <ThemeBtn />
      </div>
    </div>
  );
};

export default Header;
