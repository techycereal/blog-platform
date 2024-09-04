'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // State for file
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Parse user data from local storage
    } else {
      router.push('/'); // Redirect if no user data found
    }
  }, [router]);

  const uploadBlog = async (e) => {
    e.preventDefault();

    const safeCharRegex = /^[a-zA-Z0-9\s"-_!'.,]*$/;

    if (title.trim() === '' || content.trim() === '') {
      setErrorMessage('Please fill out all fields.');
      setSuccessMessage(''); // Clear success message if there's an error
      return;
    }

    if (!safeCharRegex.test(title) || !safeCharRegex.test(content)) {
      setErrorMessage('Please use only alphanumeric characters, spaces, and allowed special characters (" - _ \' ! . ,).');
      setSuccessMessage(''); // Clear success message if there's an error
      return;
    }

    setErrorMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('ownerName', userData.name); // Append ownerName
    formData.append('owner', userData.uname); // Append owner
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('/api/createpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Blog post created successfully!'); // Set success message
      setTitle(''); // Clear the title field
      setContent(''); // Clear the content field
      setFile(null); // Clear the file field
    } catch (error) {
      setErrorMessage('Error creating blog post. Please try again.');
      setSuccessMessage(''); // Clear success message if there's an error
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center py-8">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Blog Post</h2>
        <form onSubmit={uploadBlog}>
          <div className="mb-5">
            <label htmlFor='titleForm' className="block text-gray-700 font-semibold mb-2">Title:</label>
            <input
              id='titleForm'
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Enter your title...'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className="mb-5">
            <label htmlFor='contentForm' className="block text-gray-700 font-semibold mb-2">Content:</label>
            <textarea
              id='contentForm'
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder='Write your content...'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40'
            />
          </div>
          <div className="mb-5">
            <label htmlFor='fileInput' className="block text-gray-700 font-semibold mb-2">Upload File:</label>
            <input
              id='fileInput'
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            />
          </div>
          {errorMessage && <p className="text-red-600 text-sm mb-5">{errorMessage}</p>}
          {successMessage && <p className="text-green-600 text-sm mb-5">{successMessage}</p>}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
