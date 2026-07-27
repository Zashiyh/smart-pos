"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();


    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });


    const data = await res.json();


    if (data.success) {

      setMessage("Login successful 🚀");

      router.push("/dashboard");

    } else {

      setMessage(data.message);

    }

  }


  return (

    <div>

      <h1>
        SmartPOS Login
      </h1>


      <form onSubmit={handleLogin}>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button type="submit">
          Login
        </button>


      </form>


      <p>
        {message}
      </p>


    </div>

  );

}