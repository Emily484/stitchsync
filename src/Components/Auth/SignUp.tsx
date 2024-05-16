import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css';

interface SignUpProps {
    onSignUp: (user: any) => void; // replace 'any' with the type of your user
  }

  const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {

    const firebaseConfig = {
        apiKey: "AIzaSyDBvRQSTkxTv3RkWUyFSr5pUcvVStjhKEo",
        authDomain: "stitchsync-551ec.firebaseapp.com",
        projectId: "stitchsync-551ec",
        storageBucket: "stitchsync-551ec.appspot.com",
        messagingSenderId: "509364225849",
        appId: "1:509364225849:web:ddfb6d532586f724600ae8",
        measurementId: "G-M3C7LCMB8F"
    };
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // The user has been signed up
                const user = userCredential.user;
                onSignUp(user);
            })
            .catch((error: any) => {
                // There was an error signing up the user
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <div className="SignUp">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="SignUp input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input className="SignUp input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button className="SignUp button" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;