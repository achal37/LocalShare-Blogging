import React from "react";
import { useLocation } from "react-router-dom";
import PostPage from "./PostPage";

function PostDetail() {
  const location = useLocation();
  const { post } = location.state || {};
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <PostPage post={post}/>
  );
}

export default PostDetail;
