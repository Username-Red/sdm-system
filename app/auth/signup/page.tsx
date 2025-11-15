"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';


const Signup = () => {
    
    const router = useRouter();
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmit = async () => {
        await createUser(email, password);
        await sendEmailVerification();
        router.push("/")
        console.log("Signup submitted with ", email, password);
    }
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Sign Up</legend>

        <label className="label">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4" onClick={onSubmit}>Sign Up</button>
    </fieldset>
  )
}

export default Signup