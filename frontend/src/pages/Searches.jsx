import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCards from '../components/Post/PostCards';

function Searches() {
  const { text } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsByLocation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/location/${encodeURIComponent(text)}`, {
          method: 'GET',
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPostsByLocation();
  }, [text]);

  return (
    <div className="flex flex-wrap gap-y-4 gap-x-6 w-full overflow-hidden m-2 p-8">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCards key={post._id} post={post} />
        ))
      ) : (
        <p>No posts found for "{text}".</p>
      )}
    </div>
  );
}

export default Searches;
