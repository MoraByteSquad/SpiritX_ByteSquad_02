import React from 'react';

function Budget() {
  const players = [
    { name: 'Player 1', value: 2000 },
    { name: 'Player 2', value: 1500 },
    { name: 'Player 3', value: 3000 },
    { name: 'Player 4', value: 2500 },
  ];

  return (
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm h-screen flex flex-col items-center ">
      <h1 className='text-3xl font-bold m-3 mb-8 text-center uppercase'>Budget</h1>

      <div className='flex flex-col w-full max-w-2xl'>
        <div className='flex justify-between mx-10 text-2xl mb-5 text-yellow-300'>
          <h1>Initial Balance</h1>
          <p>₹ 10000</p>
        </div>
        <div className='flex justify-between mx-10 text-2xl'>
          <h1>Remaining Balance</h1>
          <p>₹ 10000</p>
        </div>
      
      
  
        
      </div>
      
      {/* Players List */}
      <div className='mt-8 w-full max-w-2xl'>
        <h2 className='text-2xl font-semibold text-center mb-4'>Players</h2>
        <ul className='w-full bg-white/10 rounded-md p-4 space-y-2'>
          {players.map((player, index) => (
            <li 
              key={index} 
              className='flex justify-between p-3 bg-black/30 rounded-md text-lg text-white'>
              <span>{player.name}</span>
              <span className='text-yellow-300'>₹ {player.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Budget;
