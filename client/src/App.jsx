import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import Login from './LoginSignup/Login';
import Signup from './LoginSignup/Signup';
import Create from './Create/Create';
import Home from './Home/Home';
import Find from './Find/Find';
import Profile from './Profile/Profile';
import CourseDetails from './Course/CourseDetails';

function App() {
  return (
    <UserProvider> {/* Provide the UserContext to the entire app */}
      <Router> {/* Router component to handle routing */}
        <Routes> {/* Routes component to define route paths */}
          <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect to login */}
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/signup" element={<Signup />} /> {/* Signup route */}
          <Route path="/create" element={<Create />} /> {/* Create class route */}
          <Route path="/courses/:courseId" element={<CourseDetails />} /> {/* Course details route */}
          <Route path="/home" element={<Home />} /> {/* Home route */}
          <Route path="/find" element={<Find />} /> {/* Find classes route */}
          <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App; 
