import React from 'react';

const Posts = () => {
    const posts = [
        {
            caption: 'First post',
            image: 'https://example.com/image1.jpg',
            like: 'heart',
            comment: 'comment',
            share: 'share',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            caption: 'Second post',
            image: 'https://example.com/image2.jpg',
            like: 'heart',
            comment: 'comment',
            share: 'share',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        // Add more posts here...
    ];

    return (
        <div className="grid grid-cols-1 gap-4">
            {posts.map((post, index) => (
                <div key={index} className="bg-white p-4 shadow-md">
                    {post.image && (
                        <img src={post.image} alt="Post" className="mb-4 rounded-lg" />
                    )}
                    {post.caption && <p className="mb-2">{post.caption}</p>}
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <span className="mr-2">{post.like}</span>
                            <span className="mr-2">{post.comment}</span>
                            <span>{post.share}</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                            {post.createdAt.toLocaleString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;