import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { post } = state || {};
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [location, setLocation] = useState(post?.location || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!post) {
      navigate("/"); // Redirect to home if no post is found
    }
  }, [post, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, content, location }),
      });

      if (response.ok) {
        navigate(`/myPosts`);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update the post");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-cwhite p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Edit Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={() => navigate(`/myPosts`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
