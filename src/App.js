import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import UserDetails from './components/userDetails';
import UserMail from './components/userMail';
import Inbox from './components/inbox';
import Message from './components/message';
import Reset from './components/reset.component'

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn === "true" ? <UserMail /> : <Login /> } />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userdetails" element={<UserDetails />} />
              <Route path="/usermail" element={<UserMail />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/message/:id" element={<Message />} />
              <Route path="/reset" element={<Reset />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
