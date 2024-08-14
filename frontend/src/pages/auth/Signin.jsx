import React, { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";

export function SignIn() {
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setNotification({
          message: "Login succeeded!",
          type: "success",
          visible: true,
        });
        setTimeout(() => {
          setNotification({ visible: false });
          window.location.href = "/";
        }, 2000);
      } else {
        setNotification({
          message: "Login failed!",
          type: "error",
          visible: true,
        });
        setTimeout(() => {
          setNotification({ visible: false });
        }, 2000);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[url('/images/sky.jpg')]">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 lg:p-8 bg-opacity-80 border-2">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md p-10">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Username{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-sblue disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-sblue disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    name="password"
                    placeholder=""
                    value={formData.password}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex mt-6 w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-600"
                >
                  Sign In <RiLoginCircleFill className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {notification.visible && (
        <div
          className={`absolute text-sm font-semibold top-4 right-4 p-2 w-1/3 bg-opacity-70 rounded border-2 ${
            notification.type === "success"
              ? "text-green-600"
              : "text-red-500"
          } bg-white shadow-lg`}
        >
          {notification.message}
        </div>
      )}
    </section>
  );
}
