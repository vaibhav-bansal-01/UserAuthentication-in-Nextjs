"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function Signup() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Signup</h1>
      <hr />
      <label htmlFor="username" className="font-bold mt-4">Username</label>
      <input
        className="border rounded-md p-2"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="username" className="font-bold mt-4">Email</label>
      <input
        className="border rounded-md p-2"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="username" className="font-bold mt-4">Password</label>
      <input
        className="border rounded-md p-2"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onSignup}
      >Signup</button>
      <Link href="/login" className="text-blue-400 hover:underline mt-4">Already have an account? Login</Link>
    </div>
  );
}
