"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
  router.push("/login");
} else {
  const errorData = await res.json(); // Capture the server's error message
  console.log("Server Error:", errorData);
  alert(`Error: ${errorData.message || "Registration failed"}`);
}
};

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-md"
      >
        <h1 className="text-4xl font-black uppercase mb-6 italic tracking-tighter">Join the Mission</h1>
        
        <div className="mb-4">
          <label className="block font-bold mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-4 border-black p-3 font-bold focus:bg-cyan-200 outline-none"
            placeholder="dev@indika.ai"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-2">Secure Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-4 border-black p-3 font-bold focus:bg-pink-200 outline-none"
            placeholder="••••••"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-black text-white font-black py-4 uppercase hover:bg-white hover:text-black border-4 border-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Initialize Account
        </button>
      </form>
    </div>
  );
}
