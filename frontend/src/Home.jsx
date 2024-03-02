import React from 'react';
import { FaHome } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
                <p className="text-gray-600 mb-4">This is the home page of our social media app.</p>
                <div className="flex items-center">
                    <FaHome className="mr-2" />
                    <span>Home</span>
                </div>
            </div>
        </div>
    );
};

export default Home;