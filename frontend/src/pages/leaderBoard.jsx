// user also should be displayed in the leaderboard
// if user is not in first 50 it should display below seperately
// real time update

import React from 'react'
import { useState, useEffect } from 'react';
import fetchLeaderBoard from '../api/leaderBoard';



function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [user, setUser] = useState("");
  const [userRank, setUserRank] = useState(0);
  
  useEffect(() => {
    fetchLeaderBoard().then((res) => {
      setLeaderBoard(res.data);
      setUserRank(res.rank);
      setUser(res.username);
    });
  }, []);


  return (
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm h-screen flex-col items-center ">
      <h1 className='text-3xl font-bold m-3 mb-8 text-center uppercase'>Leader Board</h1>

      <table className="table-auto text-center w-full border-collapse overflow-hidden rounded-lg">
        <thead>
          <tr className="bg-red-800/70 text-white">
            <th className="p-2 border border-red-900 first:rounded-tl-md last:rounded-tr-md">Rank</th>
            <th className="p-2 border border-red-900">User Name</th>
            <th className="p-2 border border-red-900">Points</th>
          </tr>
        </thead>
        <tbody>
        {leaderBoard.map((player) => (
            <tr 
              key={player.rank} 
              className={`border-b ${player.username === user.username? 'border-green-500' : 'border-gray-700'} even:bg-white/20 odd:bg-white/10`}
            >
              <td className="p-2">{player.rank}</td>
              <td className="p-2">{player.username}</td>
              <td className="p-2">{player.points}</td>
            </tr>
          ))}

        {
          (rank > 10)?(
            <tr className="bg-white/10 border-b border-green-500">
              <td className="p-2">{userRank}</td>
              <td className="p-2">{user}</td>
              <td className="p-2">{user.points}</td>
            </tr>
          ):null
        }


          <tr className="bg-white/10 border-b border-gray-700">
            <td className="p-2">1</td>
            <td className="p-2">John Doe</td>
            <td className="p-2">100</td>
          </tr>
          <tr className="bg-white/20 border-b border-gray-700">
            <td className="p-2">2</td>
            <td className="p-2">Jane Doe</td>
            <td className="p-2">90</td>
          </tr>
          <tr className="bg-white/10">
            <td className="p-2 rounded-bl-md">3</td>
            <td className="p-2">Alice</td>
            <td className="p-2 rounded-br-md">80</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}   
export default LeaderBoard;