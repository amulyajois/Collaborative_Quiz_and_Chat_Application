import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Question from "./pages/Question";
import Quiz from './pages/Quiz'; 
import Leaderboard from "./pages/LeaderBoard"; 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/question" element={<Question />} /> 
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> 
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
