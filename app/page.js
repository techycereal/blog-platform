'use client';

import Slider from "react-slick";
import Link from "next/link";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './slick-class.css'
// Helper function to truncate content if it exceeds 30 words
const truncateContent = (content, maxWords = 30) => {
  const words = content.split(' ');
  if (words.length <= maxWords) {
    return content;
  }
  return `${words.slice(0, maxWords).join(' ')}...`;
};

// Carousel settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Show one post at a time
  slidesToScroll: 1,
  centerMode: true, // Optional: to center the slides
  arrows: true,
  adaptiveHeight: true
};

export default function SignInPage() {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]); // State for recent posts
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch recent posts
  useEffect(() => {
    const getRecentPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/getposts/recent'); // Adjust this endpoint to fetch recent posts
        setRecentPosts(response.data.data.slice(0, 3)); // Set only the 3 most recent posts
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecentPosts();
  }, []);

  // Fetch older posts
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

  function RecentPostsCarousel() {
    return (
      <section className="relative bg-gray-800 text-white">
        <Slider {...carouselSettings}>
          {recentPosts.map((post) => (
            <div key={post._id} className="relative w-full h-[50vh] flex items-center justify-center">
              {post.fileUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${post.fileUrl})`,
                    backgroundSize: 'cover', // Equivalent to object-cover
                    backgroundPosition: 'top center', // Equivalent to object-top
                  }}
                >
                  {/* Add an overlay to ensure text is readable */}
                  <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 w-full">
                    <div className="text-left">
                      <h3 className="text-2xl font-bold mb-2">
                        <Link href={`/post/${post._id}`} className="text-white hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-white">{post.owner}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </section>
    );
  }

  function AllPosts() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-lg border rounded-lg p-6 transition-transform transform hover:scale-105">
            {post.fileUrl && <img src={`${post.fileUrl}`} alt="Post Image" className="w-full max-h-60 object-cover object-top rounded-lg" />}
            <h3 className="font-bold text-xl mb-2 text-black">
              <Link href={`/post/${post._id}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-300 mb-4">
              {truncateContent(post.content)}
            </p>
            <p className="text-gray-500 mt-4">
              Posted by: <Link href={`/user/${post.owner}`} className="text-gray-800 hover:underline">{post.owner}</Link>
            </p>
          </div>
        ))}
      </div>
    );
  }

  const loadMorePosts = () => {
    if (!isLoading) {
      setStart((prevStart) => prevStart + 5);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen">
      <RecentPostsCarousel />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center text-white mb-8">All Posts</h1>
        {posts.length > 0 ? <AllPosts /> : <p className="text-center text-gray-400">Loading posts...</p>}
        <button
          onClick={loadMorePosts}
          disabled={isLoading}
          className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-200 mt-6"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}
