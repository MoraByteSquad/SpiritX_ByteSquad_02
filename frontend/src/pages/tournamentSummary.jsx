import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";

const TournamentSummary = () => {
  const [stats, setStats] = useState({
    totalRuns: 0,
    totalWickets: 0,
    highestRunScorer: { name: "Player 1", runs: 100 },
    highestWicketTaker: { name: "Player 2", wickets: 5 },
  });

  useEffect(() => {
    setStats({
      totalRuns: 1500,
      totalWickets: 70,
      highestRunScorer: { name: "Player 1", runs: 500 },
      highestWicketTaker: { name: "Player 3", wickets: 20 },
    });
  }, []);

  return (
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm min-h-screen flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold m-3 mb-8 text-center uppercase">Tournament Summary</h2>
      
      <div className="w-full max-w-4xl bg-white/10 rounded-md p-4 space-y-3">
        {/* Total Runs */}
        <div className="flex justify-between items-center p-4 rounded-md text-lg cursor-pointer transition-all bg-black/30 hover:bg-red-600">
          <div className="flex items-center space-x-4">
            <GiCricketBat className="w-10 h-10 text-white" />
            <div>
              <h3 className="text-xl font-bold">Total Runs</h3>
              <p className="text-gray-300">{stats.totalRuns}</p>
            </div>
          </div>
        </div>

        {/* Total Wickets */}
        <div className="flex justify-between items-center p-4 rounded-md text-lg cursor-pointer transition-all bg-black/30 hover:bg-red-600">
          <div className="flex items-center space-x-4">
            <FaArrowUp className="w-10 h-10 text-white" />
            <div>
              <h3 className="text-xl font-bold">Total Wickets</h3>
              <p className="text-gray-300">{stats.totalWickets}</p>
            </div>
          </div>
        </div>

        {/* Highest Run Scorer */}
        <div className="flex justify-between items-center p-4 rounded-md text-lg cursor-pointer transition-all bg-black/30 hover:bg-red-600">
          <div>
            <h3 className="text-xl font-bold">Highest Run Scorer</h3>
            <p className="text-gray-300">{stats.highestRunScorer.name} - {stats.highestRunScorer.runs} Runs</p>
          </div>
        </div>

        {/* Highest Wicket Taker */}
        <div className="flex justify-between items-center p-4 rounded-md text-lg cursor-pointer transition-all bg-black/30 hover:bg-red-600">
          <div>
            <h3 className="text-xl font-bold">Highest Wicket Taker</h3>
            <p className="text-gray-300">{stats.highestWicketTaker.name} - {stats.highestWicketTaker.wickets} Wickets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;