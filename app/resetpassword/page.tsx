"use client";
import React from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSuccess] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const resetPassword = async () => {
    try {
      const token = searchParams.get("token");
      console.log("token:", token);
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.post("/api/users/reset-password", {
        token,
        NewPassword: password,
      });
      console.log("Reset password response", response.data);
      setSuccess(true);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <label htmlFor="username" className="font-bold mt-4 ">
        New Password
      </label>
      <input
        className="border rounded-md p-2"
        type="text"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={resetPassword}
      >
        Request Password Reset
      </button>
      {success && <p>Password reset successfully</p>}
    </div>
  );
}
