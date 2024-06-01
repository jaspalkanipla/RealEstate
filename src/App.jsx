import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';
export default function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>;
}
