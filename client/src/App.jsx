import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { UserProvider } from './Context/UserContext';
import Login from './LoginSignup/Login'
import Signup from './LoginSignup/Signup'
import Classes from './Classes/Classes'
import Home from './Home/Home'
import Upload from './Upload/Upload'
import Profile from './Profile/Profile'
import CourseDetails from './Components/CourseDetails'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Classes />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
