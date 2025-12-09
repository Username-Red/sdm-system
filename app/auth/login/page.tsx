"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {useSignInWithEmailAndPassword, useSendEmailVerification} from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

const SignIn = () => {
  const router = useRouter();
  const [signInUserWithEmailAndPassword] =
    useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = async () => {
    await signInUserWithEmailAndPassword(email, password);
    router.push("/");
    console.log("SignIn submitted with ", email, password);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[70vh] p-4">
      <fieldset className="fieldset bg-base-200 text-base-content border border-base-300 rounded-box w-full max-w-xs p-6 shadow-md">
        <legend className="fieldset-legend text-base-content font-bold">
          Sign In
        </legend>

        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input input-bordered w-full"
          placeholder="Email"
        />

        <label className="label mt-2">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input input-bordered w-full"
          placeholder="Password"
        />

        <button className="btn btn-neutral w-full mt-4" onClick={onSubmit}>
          Sign In
        </button>
      </fieldset>
    </div>
  );
};

export default SignIn;
