'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserPage({ params }) {
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await axios.get(`/api/myposts/${params.slug}`);
        setUserInfo(response.data.data[0]);
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };
    getUserPosts();
  }, [params.slug]);

  // Helper function to truncate content if it exceeds 30 words
  const truncateContent = (content, maxWords = 30) => {
    const words = content.split(' ');
    if (words.length <= maxWords) {
      return content;
    }
    return `${words.slice(0, maxWords).join(' ')}...`;
  };

  function AllPosts() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-900 shadow-lg border border-gray-700 rounded-lg p-6 transition-transform transform hover:scale-105">
            
            {post.fileUrl && (
              <img
                src={post.fileUrl}
                alt="Post Image"
                className="w-full h-50 object-cover object-top rounded-lg"
              />
            )}
            <h3 className="font-bold text-xl mb-2 text-white">
              <Link href={`/post/${post._id}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-300 mb-4">
              {truncateContent(post.content)}
            </p>
            <p className="text-gray-500 mt-4">
              Posted by:{" "}
              <Link href={`/user/${post.owner}`} className="text-gray-300 hover:underline">
                {post.owner}
              </Link>
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
        {userInfo ? (
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{userInfo.ownerName}</h1>
            <p className="text-gray-400 text-lg">{userInfo.owner}</p>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading user info...</p>
        )}
        {posts.length > 0 ? <AllPosts /> : <p className="text-center text-gray-400">Loading posts...</p>}
      </div>
    </div>
  );
}
