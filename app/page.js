'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Helper function to truncate content if it exceeds 30 words
const truncateContent = (content, maxWords = 30) => {
  const words = content.split(' ');
  if (words.length <= maxWords) {
    return content;
  }
  return `${words.slice(0, maxWords).join(' ')}...`;
};

export default function SignInPage() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const end = start + 5; // Calculate end based on the start
        const url = `/api/getposts/${start}i${end}`;
        const response = await axios.get(url);

        // Filter out duplicates before updating the state
        setPosts((prevPosts) => {
          const newPosts = response.data.data.filter(
            (newPost) => !prevPosts.some((prevPost) => prevPost._id === newPost._id)
          );
          return [...prevPosts, ...newPosts];
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [start]);

  function AllPosts() {
    return posts.map((post) => (
      <div key={post._id} className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
        <h3 className="font-bold text-xl mb-2 text-blue-600">
          <Link href={`/post/${post._id}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          {truncateContent(post.content)}
        </p>
        <p className="text-sm text-gray-500">
          Posted by: <Link href={`/user/${post.owner}`} className="text-blue-600 hover:underline">{post.owner}</Link>
        </p>
      </div>
    ));
  }

  const loadMorePosts = () => {
    if (!isLoading) {
      setStart((prevStart) => prevStart + 5);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Posts</h1>
        {posts.length > 0 ? <AllPosts /> : <p className="text-center text-gray-600">Loading posts...</p>}
        <button
          onClick={loadMorePosts}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-6"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}
