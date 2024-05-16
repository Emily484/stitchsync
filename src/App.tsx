import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import { getAuth, signOut } from 'firebase/auth';
import './App.css'

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