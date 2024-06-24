import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import './App.css'

const firebaseConfig = {
  apiKey: "AIzaSyDBvRQSTkxTv3RkWUyFSr5pUcvVStjhKEo",
    authDomain: "stitchsync-551ec.firebaseapp.com",
    projectId: "stitchsync-551ec",
    storageBucket: "stitchsync-551ec.appspot.com",
    messagingSenderId: "509364225849",
    appId: "1:509364225849:web:ddfb6d532586f724600ae8",
    measurementId: "G-M3C7LCMB8F"
};

const app = initializeApp(firebaseConfig);

// Now you can use Firebase functions
const auth = getAuth(app);

function App() {
    const [isNewUser, setIsNewUser] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(()  => {  
        if (user) {
            navigate('/dashboard');
        }
    } , [user, navigate]);

    return (
          <div className="App">
              {user ? (
                <>
                  <button onClick={() => signOut(auth).then(() => setUser(null))}>
                    Sign Out
                  </button>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </>
              ) : (
                <>
                  {isNewUser ? <SignUp onSignUp={setUser} /> : <Login onLogin={setUser} />}
                  <button onClick={() => setIsNewUser(!isNewUser)}>
                    Switch to {isNewUser ? 'Login' : 'Sign Up'}
                  </button>
                </>
              )}
          </div>
    );
}

export default App;