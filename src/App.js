import './App.css';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"
import Home from './page/Home';
import Chat from './page/Chats';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      navigate("/")
    }
  },[])
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
  );
}

export default App;
