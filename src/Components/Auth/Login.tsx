import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css';

interface LoginProps {
    onLogin: (user: any) => void; // Replace 'any' with the type of your user object
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // The user has been logged in
                const user = userCredential.user;
                onLogin(user);
            })
            .catch((error: any) => {
                // There was an error logging in the user
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <div className="SignUp">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="SignUp input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input className="SignUp input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button className="SignUp button" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;