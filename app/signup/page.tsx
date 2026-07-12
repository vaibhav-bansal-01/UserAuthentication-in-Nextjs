"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup response", response.data);
      router.push("/login");
      toast.success("User created successfully");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Something went wrong while signing up");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">
        {loading ? "Loading..." : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username" className="font-bold mt-4">
        Username
      </label>
      <input
        className="border rounded-md p-2"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="username" className="font-bold mt-4">
        Email
      </label>
      <input
        className="border rounded-md p-2"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="username" className="font-bold mt-4">
        Password
      </label>
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
      >
        {buttonDisabled ? "Fields cannot be empty" : "Signup"}
      </button>
      <Link href="/login" className="text-blue-400 hover:underline mt-4">
        Already have an account? Login
      </Link>
    </div>
  );
}
