import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './LoginSignup/Login'
import Signup from './LoginSignup/Signup'
import Classes from './Classes/Classes'
import Home from './Home/Home'
import Upload from './Upload/Upload'
import Profile from './Profile/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
