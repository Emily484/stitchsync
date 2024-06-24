import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import './SignUp.css';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

interface SignUpProps {
    onSignUp: (user: any) => void; // replace 'any' with the type of your user
  }

  const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    interface UserData {
        uid: string;
        email: string;
        // add any other user info you want to store
    }

    const createUser = async (userData: UserData): Promise<string> => {
        try {
            const usersCollection = collection(db, 'users');
            const newUserRef = await addDoc(usersCollection, userData);
            console.log('User created with ID: ', newUserRef.id);
            return newUserRef.id;
        } catch (error) {
            console.error('Error creating user: ', error);
            throw new Error('Failed to create user');
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
    
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email || '',
                        // add any other user info you want to store
                    }
                    console.log(userData)
                    createUser(userData);
                }
            });
        } catch (error) {
            console.error(error);
        }
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