import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Home } from './components/Home';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} ></Route>
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} ></Route>
      </Routes>
    </Router>
  )
}

export default App;
