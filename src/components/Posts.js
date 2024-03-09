// Posts.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Posts = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts?page=${currentPage}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage('You need to login to access this page');
        } else {
          console.error(error.response.data);
          setErrorMessage('Error fetching posts');
        }
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Explore Exciting Posts</h1>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
              <p className="mt-4 text-sm text-gray-500">Author: {post.author}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
