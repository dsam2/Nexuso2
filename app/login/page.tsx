"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1] p-4">
      {/* Neubrutalist Card */}
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <h1 className="text-4xl font-black mb-6 uppercase tracking-tight">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-400 border-2 border-black p-2 font-bold">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-4 border-black p-3 focus:outline-none focus:bg-yellow-200 transition-colors font-medium"
              placeholder="gem@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-4 border-black p-3 focus:outline-none focus:bg-pink-200 transition-colors font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#A3E635] border-4 border-black p-4 font-black uppercase text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Enter Dashboard
          </button>
        </form>

        <p className="mt-6 font-bold">
          New here? <a href="/register" className="text-blue-600 underline">Create an account</a>
        </p>
      </div>
    </div>
  );
}