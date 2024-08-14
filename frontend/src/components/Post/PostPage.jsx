// components/PostPage.jsx
import React, { useEffect, useState } from "react";
import { PiMapPinLineDuotone } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { CiBookmarkPlus, CiBookmarkCheck } from "react-icons/ci";
import { addBookmark, deleteBookmark, isPostBookmarked } from "../UserItems/Bookmark";

function PostPage({ post }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userLikedPosts = data.likedPosts || [];
          setHasLiked(userLikedPosts.includes(post._id));
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const checkIfBookmarked = async () => {
      const isBookmarked = await isPostBookmarked(post._id);
      setHasBookmarked(isBookmarked);
    };

    checkIfLiked();
    checkIfBookmarked();
  }, [post._id]);

  const handleBookmark = async () => {
    if (hasBookmarked) {
      // Assuming the post ID itself is used as the bookmark ID
      const success = await deleteBookmark(post._id);
      if (success) {
        setHasBookmarked(false);
      }
    } else {
      const bookmark = await addBookmark(post._id);
      if (bookmark) {
        setHasBookmarked(true);
      }
    }
  };

  const handleLike = async () => {
    const action = hasLiked ? "unlike" : "like";

    try {
      const response = await fetch(
        `http://localhost:5000/likes/${post._id}/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const updatedLikes = await response.json();
        setLike(updatedLikes.likes);
        setHasLiked(!hasLiked);
      } else {
        console.error("Failed to update like status");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/comments/${post._id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchComments();
  }, [post._id, comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      content: comment,
      post: post._id,
    };

    try {
      const response = await fetch(`http://localhost:5000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]);
        setComment(""); // Clear the input field after submitting
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-cwhite p-6 rounded-lg duration-300">
      <h2 className="text-4xl mb-4 font-extrabold text-gray-800">
        {post.title}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        By {post.author?.name || "Unknown Author"}
      </p>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <div className="flex justify-between items-center mb-6">
        <p className="flex items-center gap-x-2 text-teal-600 hover:text-teal-800 transition-colors duration-300">
          <PiMapPinLineDuotone className="text-xl" /> {post.location}
        </p>
        <div className="flex gap-x-4">
          <button onClick={handleBookmark}>
            {hasBookmarked ? (
              <CiBookmarkCheck className="text-2xl text-blue-400" />
            ) : (
              <CiBookmarkPlus className="text-2xl" />
            )}
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center gap-x-2 transition-colors duration-300 text-red-500`}
          >
            {hasLiked ? (
              <FcLike className="text-2xl" />
            ) : (
              <GoHeart className="text-2xl" />
            )}
            {like}
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Comments:</h3>
        <div>
          <form onSubmit={handleSubmit} className="p-2 m-2">
            <input
              type="text"
              name="comment"
              placeholder="Write a comment"
              className="p-2 border-2 w-full"
              value={comment}
              onChange={handleChange}
            />
          </form>
        </div>
        <ul className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li
                key={comment._id}
                className="p-4 bg-white border-1 border-black rounded-lg transition-colors"
              >
                <p className="text-xs text-gray-800">
                  {comment.user?.name || "Anonymous"}
                </p>
                <p className="text-gray-800">{comment.content}</p>
              </li>
            ))
          ) : (
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              No comments yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;
