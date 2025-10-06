import { useState, useEffect, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

// Pages
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import NotFound from './pages/NotFound';

// Components
import NavBar from './components/NavBar';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/game" element={<GamePage />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

    </>
  )
}

export default App
