import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Detection from './pages/Detection';
import SignUp from './pages/SignUp';

function App() {
  //console.log(useAuth()?.isLoggedIn);

  return (
    <main>
    <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detection" element={<Detection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </main>
  )
}

export default App
