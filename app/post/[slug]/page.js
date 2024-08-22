'use client';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Post({ params }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/thispost/${params.slug}`);
        console.log(response.data.data)
        setPost(response.data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Author: <span className="font-semibold">{post.ownerName}</span></p>
          <p className="text-gray-500">Username: <span className="font-semibold">{post.owner}</span></p>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
}
