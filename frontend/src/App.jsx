import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './rootLayout';
import SubLayout from './subLayout';
import Budget from './pages/budget';
import EditPlayer from './pages/editPlayer';
import LeaderBoard from './pages/leaderBoard';
import Players from './pages/players';
import Login from './pages/login';
import Signup from './pages/signup';
import PerformanceSummery from './pages/performanceSummery';
import PlayerProfile from './pages/playerProfile';
import SelectTeam from './pages/selectTeam';
import Team from './pages/team';
import NotFound from './pages/notFound';
import React from 'react';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          {/* Public Routes */}
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Inside SubLayout) */}
          <Route element={<SubLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/editPlayer" element={<EditPlayer />} />
            <Route path="/leaderBoard" element={<LeaderBoard />} />
            <Route path="/players" element={<Players />} />
            <Route path="/performanceSummery" element={<PerformanceSummery />} />
            <Route path="/playerProfile" element={<PlayerProfile />} />
            <Route path="/selectTeam" element={<SelectTeam />} />
            <Route path="/team" element={<Team />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
