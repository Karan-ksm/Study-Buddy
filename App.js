import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import SessionModal from './SessionModal';

import Math from './Math';
import English from './English';
import Science from './Science';
import History from './History';

const firebaseConfig = {
  apiKey: "AIzaSyAtHbWePNprafoMyvxFOmdhUbJ8gsIsf5o",
  authDomain: "study-buddy-db75a.firebaseapp.com",
  projectId: "study-buddy-db75a",
  storageBucket: "study-buddy-db75a.appspot.com",
  messagingSenderId: "143164951647",
  appId: "1:143164951647:web:4b89f53814a9a18017dfea",
  measurementId: "G-57BLBMNJD5"
};

initializeApp(firebaseConfig);
const auth = getAuth();

const channels = [
  { name: 'Math', link: '/Math' },
  { name: 'English', link: '/English' },
  { name: 'Science', link: '/Science' },
  { name: 'History', link: '/History' }
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function App() {
  const [user] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resetFormTrigger, setResetFormTrigger] = useState(false);

  return (
    <Router>
      <div className="App">
        {user ? <AuthenticatedApp showDropdown={showDropdown} setShowDropdown={setShowDropdown} sessions={sessions} setSessions={setSessions} modalOpen={modalOpen} setModalOpen={setModalOpen} resetFormTrigger={resetFormTrigger} setResetFormTrigger={setResetFormTrigger} formatDate={formatDate} /> : <SignIn />}
      </div>
    </Router>
  );
}

function AuthenticatedApp({ showDropdown, setShowDropdown, sessions, setSessions, modalOpen, setModalOpen, resetFormTrigger, setResetFormTrigger, formatDate }) {
  const location = useLocation();

  const handleChannelChange = (channel) => {
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const addSession = (session) => {
    setSessions([...sessions, session]);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setResetFormTrigger(true);
  };

  return (
    <>
      <header>
        <div className="dropdown">
          <img className="dropdown-button" src="/menu copy.png" alt="Menu" onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
          {showDropdown && (
            <ul className="dropdown-list">
              {channels.map((channel, index) => (
                <li key={index} onClick={() => handleChannelChange(channel)}>
                  <Link to={channel.link}>{channel.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/">
          <img className="StudyBuddy-logo" src="/Study_Buddy_LOGO-removebg-preview.png" alt="Study Buddy Logo" style={{ cursor: 'pointer' }} />
        </Link>
        <SignOut />
      </header>
      <section>
        {location.pathname === "/" && (
          <div className="centered-box">
            <h2>Scheduled Sessions</h2>
            {sessions.map((session, index) => (
              <div key={index} className="session-box">
                <h3>{session.className}</h3>
                <p>Date: {formatDate(session.classDate)}</p>
                <p>Time: {session.classTime}</p>
                <p>Meeting Link: <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">{session.meetingLink}</a></p>
              </div>
            ))}
            <button className="add-session-button" onClick={() => setModalOpen(true)}>+ Add a Buddy Session</button>
          </div>
        )}
        <SessionModal
          isOpen={modalOpen}
          onClose={onCloseModal}
          onAddSession={addSession}
          resetFormTrigger={resetFormTrigger}
          setResetFormTrigger={setResetFormTrigger}
        />
        <Routes>
          <Route path="/Math" element={<Math />} />
          <Route path="/English" element={<English />} />
          <Route path="/Science" element={<Science />} />
          <Route path="/History" element={<History />} />
        </Routes>
      </section>
    </>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(error => {
      console.error('Authentication error:', error);
      alert('Failed to sign in: ' + error.message);
    });
  };

  return (
    <div className="login-container">
      <Link to="/">
        <img src="/Study_Buddy_LOGO-removebg-preview.png" alt="Study Buddy Logo" style={{ maxWidth: '200px', marginBottom: '20px', cursor: 'pointer' }} />
      </Link>
      <button className="sign-in" onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
}

function SignOut() {
  return (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;
