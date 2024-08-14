import React, { useEffect, useState } from 'react';
import PostCard from '../Post/PostCards'; // Adjust the import path if necessary
import { getUserBookmarks } from '../UserItems/Bookmark'; // Adjust the import path if necessary

function UserBookmarks() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const postIds = await getUserBookmarks(); // Fetch the list of bookmarked post IDs
        console.log(postIds);
        if (postIds.length > 0) {
          // Fetch the details of each bookmarked post
          
          const posts = await Promise.all(postIds.map(async (postId) => {
            const response = await fetch(`http://localhost:5000/posts/${postId}`, {
              method: 'GET',
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
            if (response.ok) {
              return response.json();
            } else {
              console.error('Failed to fetch post:', postId);
              return null;
            }
          }));
          setBookmarkedPosts(posts.filter(post => post !== null)); // Set the state with fetched posts
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Bookmarked Posts</h2>
      <div className="flex flex-wrap gap-6">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p>No bookmarked posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserBookmarks;
