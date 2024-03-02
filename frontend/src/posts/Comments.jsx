import React from "react";

const Comments = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-bold mb-4'>Comments</h2>
      <div className='flex items-start space-x-4'>
        <img
          className='w-10 h-10 rounded-full'
          src='https://via.placeholder.com/50'
          alt='User Avatar'
        />
        <div className='flex-grow'>
          <div className='bg-gray-100 rounded-lg p-2'>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className='text-gray-500 text-xs mt-1'>
            John Doe - 2 hours ago
          </div>
        </div>
      </div>
      <div className='flex items-start space-x-4 mt-4'>
        <img
          className='w-10 h-10 rounded-full'
          src='https://via.placeholder.com/50'
          alt='User Avatar'
        />
        <div className='flex-grow'>
          <div className='bg-gray-100 rounded-lg p-2'>
            <p className='text-sm'>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </p>
          </div>
          <div className='text-gray-500 text-xs mt-1'>
            Jane Smith - 1 hour ago
          </div>
        </div>
      </div>
      {/* Add more comments here */}
    </div>
  );
};

export default Comments;
