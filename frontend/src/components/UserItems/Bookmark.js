export const addBookmark = async (postId) => {
  try {
    const response = await fetch("http://localhost:5000/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId }),
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to add bookmark");
      return false;
    }
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
};

export const deleteBookmark = async (postId) => {
  try {
    const response = await fetch("http://localhost:5000/bookmarks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId }),
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to delete bookmark");
      return false;
    }
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
};

export const getUserBookmarks = async () => {
  try {
    const response = await fetch("http://localhost:5000/profile/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user.bookmarkedPosts || [];
    } else {
      console.error("Failed to get bookmarks");
      return [];
    }
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

export const isPostBookmarked = async (postId) => {
  const bookmarks = await getUserBookmarks();
  return bookmarks.includes(postId);
};
