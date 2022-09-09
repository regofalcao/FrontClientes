import React, { useState } from "react";
import api from "../service/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (name, email, password) => {
    api
      .post("/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        window.location.href = "/login";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" min-w-full h-screen flex items-center justify-center">
      <div className="flex flex-col border-2 px-14 py-5 rounded-lg">
        <h1 className="mb-5 text-center text-3xl font-bold tracking-tight text-indigo-500">
          Sign-up
        </h1>
        <form
          className="w-[300px] gap-2 flex flex-col items-center justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            const [email, password] = event.target.children;
            handleSubmit(email, password, name);
          }}
        >
          <input
            onChange={(event) => setName(event.target.value)}
            id="Name"
            name="Name"
            autoComplete="Name"
            required
            className=" flex w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Name"
          />

          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className=" flex w-full appearance-none required rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
          />

          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className=" flex w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />

          <button
            type="button"
            onClick={() => handleSubmit(name, email, password)}
            value="Submit"
            className="group mt-5 relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
          >
            Sign-up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
