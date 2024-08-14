import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PostCards from "../../components/Post/PostCards";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useUser(); // Access user data from context
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/SignIn"); // Redirect to sign-in page if no token
      return;
    }

    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    };

    fetch('http://localhost:5000/posts', init)
      .then(response => {
        if (!response.ok) throw new Error('Error: ' + response.statusText);
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => console.error(error));
  }, [navigate]);

  if (!user) return <div className="text-red-500 font-bold text-center">Loading...</div>;

  return (
    <div className="flex flex-wrap gap-y-4 gap-x-6 w-full overflow-hidden m-2 p-8">
      {posts.map((post) => (
        <Link to={`/posts/${post._id}`} key={post._id} state={{ post }}>
          <PostCards post={post} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
