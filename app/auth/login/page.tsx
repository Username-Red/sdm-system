"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';


const SignIn = () => {
    
    const router = useRouter();
    const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmit = async () => {
        await signInUserWithEmailAndPassword(email, password);
        router.push("/")
        console.log("SignIn submitted with ", email, password);
    }
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Sign In</legend>

        <label className="label">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4" onClick={onSubmit}>Sign In</button>
    </fieldset>
  )
}

export default SignIn