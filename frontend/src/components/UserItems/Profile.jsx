import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

function Profile() {
  const { user, setUser } = useUser(); // Access user data from context
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/profile/me/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);  // Update the user context with the new data
        setIsEditing(false);   // Close the editing form
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!user) return <div className="text-red-500 font-bold text-center">Loading...</div>;

  return (
    <div className="bg-cwhite p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=89ABE3&color=FCF6F5`}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-200 mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-700">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.username}</p>
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-sblue" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-sblue" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-sblue" />
            <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-sblue text-cwhite p-2 rounded-md w-full hover:bg-white hover:text-sblue flex items-center justify-center"
          >
            Edit Profile <FaEdit className="ml-2" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-2 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border-2 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="mt-4 bg-sblue text-cwhite p-2 rounded-md w-full hover:bg-white hover:text-sblue"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded-md w-full hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
