import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './rootLayout'
import Budget from './pages/budjet'
import EditPlayer from './pages/editPlayer'
import LeaderBoard from './pages/leaderBoard'
import Players from './pages/players'
import Login from './pages/login'
import Signup from './pages/signup'
import PerformanceSummery from './pages/performanceSummery'
import PlayerProfile from './pages/playerProfile'
import SelectTeam from './pages/selectTeam'
import Team from './pages/team'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/budjet" element={<Budget />} />
          <Route path="/editPlayer" element={<EditPlayer />} />
          <Route path="/leaderBoard" element={<LeaderBoard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/performanceSummery" element={<PerformanceSummery />} />
          <Route path="/playerProfile" element={<PlayerProfile />} />
          <Route path="/selectTeam" element={<SelectTeam />} />
          <Route path="/team" element={<Team />} />
          {/* Add more routes as needed */}
        </Routes>
      </RootLayout>
    </Router>
  )
}

export default App
