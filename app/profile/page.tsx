"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [data, setData] = React.useState("nothing");

  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout response", response.data);
      toast.success("User logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Something went wrong while logging out");
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log("User details", res.data);
    setData(res.data.user._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Profile</h1>
      <hr />
      <h2 className="text-xl font-bold">
        {data !== "nothing" ? (
          <Link href={`/profile/${data}`}>{data}</Link>
        ) : (
          "No user found"
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onLogout}
      >
        Logout
      </button>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
