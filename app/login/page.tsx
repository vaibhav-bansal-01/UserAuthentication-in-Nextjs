"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response", response.data);
      router.push("/profile");
      toast.success("User logged in successfully");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Something went wrong while logging in");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">{loading ? "Loading..." : "Login"}</h1>
      <hr />
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

      <Link href="/forgot-password-request" className="text-blue-400 hover:underline mt-4">
        Forgot Password?
      </Link>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onLogin}
      >
        {buttonDisabled ? "Fields cannot be empty" : "Login"}
      </button>
      <Link href="/signup" className="text-blue-400 hover:underline mt-4">
        Don't have an account? Signup
      </Link>
    </div>
  );
}
