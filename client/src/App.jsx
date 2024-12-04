import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { UserProvider } from './Context/UserContext';
import Login from './LoginSignup/Login'
import Signup from './LoginSignup/Signup'
import Create from './Create/Create'
import Home from './Home/Home'
import Find from './Find/Find'
import Profile from './Profile/Profile'
import CourseDetails from './Course/CourseDetails'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/find" element={<Find />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
