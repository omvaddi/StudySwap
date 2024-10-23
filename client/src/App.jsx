import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginSignup from './Components/LoginSignup/LoginSignup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
