import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
  });
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPost = await response.json();
        setNotification({
          message: 'Post created successfully!',
          type: 'success',
          visible: true,
        });
        setTimeout(() => {
          setNotification({ visible: false });
          navigate(`/newpost/${newPost._id}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setNotification({
          message: `Failed to create post: ${errorData.error}`,
          type: 'error',
          visible: true,
        });
        setTimeout(() => {
          setNotification({ visible: false });
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({
        message: 'An error occurred while creating the post.',
        type: 'error',
        visible: true,
      });
      setTimeout(() => {
        setNotification({ visible: false });
      }, 2000);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Post
          </button>
        </form>
        {notification.visible && (
          <div
            className={`mt-4 text-center p-2 rounded border-2 ${
              notification.type === 'success'
                ? 'text-green-600 border-green-600'
                : 'text-red-600 border-red-600'
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </section>
  );
}
