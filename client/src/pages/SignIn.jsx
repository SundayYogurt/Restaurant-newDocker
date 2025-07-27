import React, { useState } from "react";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Login data:", loginData);

  try {
    const response = await fetch("http://localhost:3000/api/v1/register/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      const result = await response.json();
      alert("Login successful!");
      console.log("Result from server:", result);
      // ทำ redirect หรือเก็บ token ได้ที่นี่
    } else {
      const err = await response.json();
      alert("Login failed: " + err.message);
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred while logging in.");
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <img
            alt="grab restaurant"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS40T_zWGmKbsnTCWBoCVnVgEiKQ8LgHTQ0zA&s"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Sign in to your account
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={loginData.username}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={loginData.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-soft btn-primary bg-white text-gray-800 hover:bg-gray-100 w-full"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
