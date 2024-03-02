import React from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-center bg-blue-500 h-32">
                    <img
                        className="h-24 w-24 rounded-full object-cover"
                        src="https://example.com/profile-image.jpg"
                        alt="Profile"
                    />
                </div>
                <div className="py-4 px-6">
                    <h1 className="text-2xl font-semibold">John Doe</h1>
                    <p className="text-gray-600">john.doe@example.com</p>
                </div>
                <div className="border-t border-gray-200 py-4 px-6">
                    <h2 className="text-lg font-semibold mb-2">Posts</h2>
                    {/* Render posts here */}
                </div>
                <div className="border-t border-gray-200 py-4 px-6">
                    <h2 className="text-lg font-semibold mb-2">Comments</h2>
                    {/* Render comments here */}
                </div>
            </div>
        </div>
    );
};

export default Profile;