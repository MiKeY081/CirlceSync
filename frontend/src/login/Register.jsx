import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <div className="w-64">
                <div className="flex items-center border-b border-gray-500 py-2">
                    <FaUser className="mr-2" />
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-gray-500 py-2 mt-4">
                    <FaEnvelope className="mr-2" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-gray-500 py-2 mt-4">
                    <FaLock className="mr-2" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-6 rounded">
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;