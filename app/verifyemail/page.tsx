"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyEmail", {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyEmail(); 
        }
    }, [token])

    return (
        <div>
            {error && <p>Error verifying email</p>}
            {verified && <p>Email verified successfully</p>}
            {!verified && !error && <p>Verifying email...</p>}
        </div>
    )
    
}