import React from 'react'
function Budget() {
  return (
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm h-screen flex-col items-center ">
      <h1 className='text-3xl font-bold m-3 mb-8 text-center uppercase'>Balance</h1>

      <div className='flex flex-col  '>
        <div className='flex justify-between mx-20 text-2xl mb-5 text-yellow-300'>
          <h1>Initial Balance</h1>
          <p>₹ 10000</p>
        </div>
        <div>
        <div className='flex justify-between mx-20 text-2xl'>
          <h1>Remaining Balance</h1>
          <p>₹ 10000</p>
        </div>

        </div>
        <div className='h-1 bg-white mt-5'></div>
        <div className='flex justify-between mx-20 text-2xl text-yellow-300'>
          <h1>Remaining Balance</h1>
          <p>₹ 10000</p>
        </div>
        <div className='h-0.5 bg-white mb-0.5 '></div>
        <div className='h-1 bg-white'></div>
      
      </div>
      
      

      

    </div>
  );
}

export default Budget;