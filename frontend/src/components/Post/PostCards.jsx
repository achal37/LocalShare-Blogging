import React, { useEffect, useState } from "react";
import { PiMapPinLineDuotone } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { CiBookmarkPlus, CiBookmarkCheck } from "react-icons/ci";
import { TfiComment } from "react-icons/tfi";
import { isPostBookmarked } from '../UserItems/Bookmark'; // Import the isPostBookmarked function

function PostCards({ post }) {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  // Check if the post is bookmarked when the component mounts
  useEffect(() => {
    const checkIfBookmarked = async () => {
      const bookmarked = await isPostBookmarked(post._id);
      setIsBookmarkedState(bookmarked);
    };

    checkIfBookmarked();
  }, [post._id]);

  return (
    <div className="relative bg-cwhite border border-gray-300 p-6 w-80 sm:w-96 lg:w-[350px] rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
      <div
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => console.log("Bookmark toggled")}
      >
        {isBookmarkedState ? (
          <CiBookmarkCheck className="text-3xl text-blue-400" />
        ) : (
          <CiBookmarkPlus className="text-3xl" />
        )}
      </div>
      <h2 className="text-xl mb-3 font-extrabold text-gray-800">
        {post.title.slice(0, 25)}...
      </h2>
      <p className="text-gray-700 mb-4">
        {post.content.slice(0, 100)}...
        <span className="text-sblue font-semibold ml-2 cursor-pointer">Read More</span>
      </p>
      <div className="flex justify-between items-center mt-auto">
        <p className="flex items-center gap-x-1 text-teal-600">
          <PiMapPinLineDuotone className="text-lg" />
          {post.location}
        </p>
        <div className="flex items-center gap-x-4">
          <p className="flex items-center gap-x-1 text-red-500">
            <GoHeart className="text-xl" />
            {post.likes}
          </p>
          <p className="flex items-center gap-x-1 text-sblue">
            <TfiComment className="text-lg" />
            {post.comments.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostCards;
