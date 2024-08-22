'use client';
import axios from "axios";
import { useEffect, useState } from "react";

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

  function AllPosts() {
    return posts.map((post) => (
      <div key={post.title} className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-6 transition-transform transform hover:scale-105 hover:shadow-lg">
        <h3 className="font-bold text-xl text-blue-600 mb-2">{post.title}</h3>
        <p className="text-gray-700">{post.content}</p>
      </div>
    ));
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {userInfo ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{userInfo.ownerName}</h1>
          <p className="text-gray-600 text-lg">{userInfo.owner}</p>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading user info...</p>
      )}
      {posts.length > 0 ? <AllPosts /> : <p className="text-center text-gray-600">Loading posts...</p>}
    </div>
  );
}
