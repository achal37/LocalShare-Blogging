import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

export function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setNotification({ message: 'Success!', type: 'success' });
        window.location.href = "/auth/SignIn";
      } else {
        setNotification({ message: 'Try Again!', type: 'error' });
        alert(data.error); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[url('/images/sky.jpg')]">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 lg:p-8 bg-opacity-80 border-2">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md p-10">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Register
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/auth/SignIn"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </a>
          </p>
          {notification.message && (
            <p
              id="notify"
              className={`mt-4 ${notification.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
            >
              {notification.message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="text-base font-medium text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-sblue disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-sblue disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-sblue disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    name="email"
                    placeholder="abc@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="text-base font-medium text-gray-900">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-sblue disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="location"
                    placeholder="City Name"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-sblue disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    name="password"
                    placeholder=""
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex mt-6 w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-600"
                >
                  Register <FaLongArrowAltRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
