import React from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {post.image && (
                <img src={post.image} alt="Post Image" className="w-full mb-4" />
            )}
            {post.caption && <p className="text-lg mb-4">{post.caption}</p>}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <FaThumbsUp className="mr-2" />
                    <span>{post.like}</span>
                </div>
                <div className="flex items-center">
                    <FaComment className="mr-2" />
                    <span>{post.comment}</span>
                </div>
                <div className="flex items-center">
                    <FaShare className="mr-2" />
                    <span>{post.share}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;