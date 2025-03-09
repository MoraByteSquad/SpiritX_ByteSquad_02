// App.jsx
import React from 'react';
import { FaUsers, FaChartBar, FaUsersCog, FaCrown, FaMoneyBillWave, FaUserCheck, FaCircle, FaBan } from 'react-icons/fa';
import { MdSportsCricket, MdLeaderboard } from 'react-icons/md';
import image from '../assets/cricket-stadium.jpg';
import image2 from '../assets/cricket-background.jpg';

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={image}
            alt="Cricket stadium" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="animate-pulse mb-2">
            <MdSportsCricket className="inline-block text-yellow-500 text-6xl transform -rotate-45" />
            <FaCrown className="inline-block text-red-600 text-4xl ml-2" />
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4">
            
            <span className="text-red-600">Byte</span>
            <span className="text-white">Squad</span>
            <span className="text-yellow-500">Cricket</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Build your dream cricket team, compete against other players, and climb the leaderboard in this ultimate cricket fantasy game!
          </p>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 shadow-lg"
            onClick={() => window.location.href = "/login"}
          >
            PLAY NOW
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-yellow-500">Game</span> <span className="text-white">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-800 rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/20 border-t-2 border-red-600">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-yellow-500">Team Selection</h3>
              <p className="text-gray-300 text-center">
                Create your dream team by selecting players across different categories while managing your budget of 9,000,000.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-gray-800 rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20 border-t-2 border-yellow-500">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MdLeaderboard className="text-3xl text-black" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-red-600">Leaderboard</h3>
              <p className="text-gray-300 text-center">
                Compete against other players and climb the rankings based on your team's performance and total points.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-gray-800 rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 border-t-2 border-white">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaChartBar className="text-3xl text-black" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-yellow-500">Real-time Stats</h3>
              <p className="text-gray-300 text-center">
                Experience real-time updates of player statistics and team performance without needing to refresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          
          
          <div className="flex  items-center justify-center mx-70 text-center">
            {/* User Interface */}
            <div className="flex-1 bg-gray-800 rounded-lg p-8 border-l-4 border-red-600 text-center">
              <div className="flex items-center justify-center mb-6">
                <FaUserCheck className="text-4xl text-red-600 mr-4" />
                <h3 className="text-2xl font-bold text-yellow-500">User Interface</h3>
              </div>
              <ul className="space-y-3 text-gray-300 text-xl">
                <li className="flex justify-center">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Browse and view detailed profiles of all available players</span>
                </li>
                <li className="flex justify-center">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Select players by category to build your ultimate team</span>
                </li>
                <li className="flex justify-center">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Track your budget and team completion status</span>
                </li>
                <li className="flex justify-center">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>View team performance and total points once your team is complete</span>
                </li>
                <li className="flex justify-center">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Compete on the leaderboard against other players</span>
                </li>
              </ul>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Game Screenshots */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">Game</span> <span className="text-yellow-500">Screenshots</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Screenshot 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
              <img src="/api/placeholder/600/400" alt="Player selection screen" className="w-full h-auto" />
              <div className="bg-gray-800 p-4">
                <h3 className="text-lg font-semibold text-yellow-500">Player Selection</h3>
                <p className="text-gray-400 text-sm">Browse and select players by category</p>
              </div>
            </div>
            
            {/* Screenshot 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
              <img src="/api/placeholder/600/400" alt="Team management screen" className="w-full h-auto" />
              <div className="bg-gray-800 p-4">
                <h3 className="text-lg font-semibold text-yellow-500">Team Management</h3>
                <p className="text-gray-400 text-sm">View and manage your selected team</p>
              </div>
            </div>
            
            {/* Screenshot 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
              <img src="/api/placeholder/600/400" alt="Leaderboard screen" className="w-full h-auto" />
              <div className="bg-gray-800 p-4">
                <h3 className="text-lg font-semibold text-yellow-500">Leaderboard</h3>
                <p className="text-gray-400 text-sm">Compete against other players</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-red-600">Key</span> <span className="text-white">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMoneyBillWave className="text-3xl text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Budget System</h3>
              <p className="text-gray-300">Manage your 9,000,000 budget wisely to build the strongest team possible.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBan className="text-3xl text-white transform -rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Player Stats</h3>
              <p className="text-gray-300">View detailed statistics for each player to make informed team selections.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MdSportsCricket className="text-3xl text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Player Categories</h3>
              <p className="text-gray-300">Select players from various categories to build a balanced and powerful team.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCrown className="text-3xl text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Points System</h3>
              <p className="text-gray-300">Earn points based on your players' performance in real cricket matches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={image2} 
            alt="Cricket background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to <span className="text-red-600">Play</span>?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of players competing in SpiritX_ByteSquad_02. Build your team, track your progress, and rise to the top of the leaderboard!
          </p>
          <button 
            className="bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/30 focus:outline-none"
            onClick={() => window.location.href = "/login"}
          >
            START PLAYING NOW
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">
                <span className="text-red-600">Spirit</span>
                <span className="text-yellow-500">X</span>
                <span className="text-white">_ByteSquad</span>
              </h3>
              <p className="text-gray-400 mt-2">The Ultimate Cricket Fantasy Game</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition duration-300">Contact Us</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2025 SpiritX_ByteSquad . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;