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
      <div key={post.title} className="shadow-lg border border-gray-300 rounded-lg p-2 mb-4 transition-transform transform hover:scale-105">
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600">{post.content}</p>
      </div>
    ));
  }

  return (
    <div className="container mx-auto p-4">
      {userInfo ? (
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{userInfo.ownerName}</h1>
          <p className="text-gray-700">{userInfo.owner}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
      {posts.length > 0 ? <AllPosts /> : <p>Loading posts...</p>}
    </div>
  );
}
