"use client";

import { useState } from "react";

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function runSetup() {
    setStatus("running");
    setMessage("Connecting to database and applying schema + seed...");

    try {
      const res = await fetch("/api/setup", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Setup failed");
      setStatus("success");
      setMessage(data.message || "Setup completed successfully.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-lg rounded-2xl bg-ivory p-8 shadow-xl">
        <h1 className="font-playfair text-2xl font-bold text-charcoal mb-2">
          Database Setup
        </h1>
        <p className="text-sm text-charcoal-600 mb-6">
          This one-time step creates tables and seeds the Frame By Frame event data.
          Make sure <code className="text-xs bg-charcoal-100 px-1 rounded">DATABASE_URL</code> is
          set in your Vercel environment variables first.
        </p>

        {status === "idle" && (
          <button onClick={runSetup} className="btn-primary w-full">
            Run Setup
          </button>
        )}

        {status === "running" && (
          <p className="text-center text-charcoal-600">{message}</p>
        )}

        {status === "success" && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            <p className="font-medium mb-2">✅ {message}</p>
            <p>
              Super Admin: <strong>admin@framebyframe.in</strong><br />
              Temporary password: <strong>Admin@Frame2027</strong>
            </p>
            <p className="mt-3">
              <a href="/admin/login" className="text-champagne underline">
                Go to Admin Login →
              </a>
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
