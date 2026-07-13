"use client";
import React from "react";
import axios from "axios";

export default function ForgotPasswordRequest() {
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const forgotPasswordRequest = async () => {
    try {
      const response = await axios.post("/api/users/forgor-password-request", {
        email,
      });
      console.log("Forgot password request response", response.data);
      setSuccess(true);
    } catch (error: any) {
      console.log(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <label htmlFor="username" className="font-bold mt-4 ">
        Email
      </label>
      <input
        className="border rounded-md p-2"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={forgotPasswordRequest}
      >
        Request Password Reset
      </button >
      <hr />
      {success && <p>Password reset email sent successfully</p>}
    </div>
  );
}
