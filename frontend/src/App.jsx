import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./rootLayout";
import SubLayout from "./subLayout";
import Budget from "./pages/budget";
import EditPlayer from "./pages/editPlayer";
import LeaderBoard from "./pages/leaderBoard";
import Players from "./pages/players";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PerformanceSummery from "./pages/performanceSummery";
import PlayerProfile from "./pages/playerProfile";
import SelectTeam from "./pages/selectTeam";
import Team from "./pages/team";
import NotFound from "./pages/notFound";
import React from "react";
import HomePage from "./pages/home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* RootLayout wraps everything else */}
          <Route element={<RootLayout />}>
            {/* Public Routes inside RootLayout */}
        
            {/* Protected Routes inside SubLayout */}
            <Route element={<ProtectedRoute><SubLayout /></ProtectedRoute>}>
              <Route path="budget" element={<Budget />} />
              <Route path="editPlayer" element={<EditPlayer />} />
              <Route path="leaderBoard" element={<LeaderBoard />} />
              <Route path="players" element={<Players />} />
              <Route path="performanceSummery" element={<PerformanceSummery />} />
              <Route path="playerProfile" element={<PlayerProfile />} />
              <Route path="selectTeam" element={<SelectTeam />} />
              <Route path="team" element={<Team />} />
            </Route>

            {/* Catch-all Route inside RootLayout */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
