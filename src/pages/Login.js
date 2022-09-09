import React, { useState } from "react";
import { setAuthToken } from "../helpers/setAuthToken";
import api from "../service/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (email, password) => {
    api
      .post("/authenticate", {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setAuthToken(token);
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" min-w-full h-screen flex items-center justify-center">
      <div className="flex flex-col border-2 px-14 py-5 rounded-lg">
        <h1 className="mb-5 text-center text-3xl font-bold tracking-tight text-indigo-500">
          Sign-in
        </h1>
        <form
          className="w-[300px] flex flex-col items-center justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            const [email, password] = event.target.children;
            handleSubmit(email, password);
          }}
        >
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className=" flex w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
            onClick={() => handleSubmit(email, password)}
            value="Submit"
            className="group mt-5 relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
          >
            Sign-in
          </button>
        </form>
        <div className="flex w-full justify-end flex-end text-indigo-500 font-semibold  ">
          <a
            className="flex w-[30px] justify-end flex-end text-indigo-500 font-semibold  "
            href="Signup"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login;
