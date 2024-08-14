import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostPage from './PostPage';

function NewPostDisplay() {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      }
    };

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`, init);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostPage post={post}/>
  );
}

export default NewPostDisplay;
