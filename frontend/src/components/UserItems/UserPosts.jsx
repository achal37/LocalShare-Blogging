import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import PostCards from "../Post/PostCards";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

function UserPosts() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:5000/posts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          setPosts(posts.filter(post => post._id !== postId));
        } else {
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleUpdate = (post) => {
    navigate(`/edit-post/${post._id}`, { state: { post } });
  };

  return (
    <div className="flex flex-wrap gap-y-4 gap-x-6 w-full overflow-hidden m-2 p-8">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="relative">
            <Link to={`/posts/${post._id}`} state={{ post }}>
              <PostCards post={post} />
            </Link>
            <div className="absolute bottom-4 left-44 flex space-x-2">
              <button
                className="hover:text-blue-500 text-gray-500 rounded"
                onClick={() => handleUpdate(post)}
              >
                <FiEdit className="text-2xl"/>
              </button>
              <button
                className="hover:text-red-500 text-gray-500 rounded"
                onClick={() => handleDelete(post._id)}
              >
                <AiOutlineDelete className="text-2xl"/>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found for this user.</p>
      )}
    </div>
  );
}

export default UserPosts;
