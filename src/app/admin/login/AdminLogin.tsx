"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.refresh();
        router.push("/admin");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginStyles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#f8fafc",
      color: "#0f172a",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "32px",
    },
    brandTitle: {
      fontSize: "24px",
      fontWeight: "bold" as const,
      textAlign: "center" as const,
      color: "#0f172a",
      margin: "0 0 4px 0",
    },
    brandSub: {
      fontSize: "11px",
      letterSpacing: "1px",
      color: "#2563eb",
      textTransform: "uppercase" as const,
      fontWeight: "bold" as const,
      textAlign: "center" as const,
      marginBottom: "24px",
      display: "block",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "6px",
      marginBottom: "16px",
    },
    label: {
      fontSize: "12px",
      fontWeight: "600" as const,
      color: "#475569",
    },
    input: {
      background: "#ffffff",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      padding: "10px 12px",
      color: "#0f172a",
      fontSize: "14px",
      outline: "none",
      width: "100%",
    },
    submitBtn: {
      width: "100%",
      padding: "10px",
      background: "#2563eb",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600" as const,
      marginTop: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      transition: "background 0.2s",
    },
    errorBox: {
      padding: "10px 12px",
      background: "#fef2f2",
      border: "1px solid #fca5a5",
      borderRadius: "6px",
      color: "#b91c1c",
      fontSize: "13px",
      marginBottom: "16px",
      lineHeight: "1.4",
    },
  };

  return (
    <main style={loginStyles.container}>
      <div style={loginStyles.card}>
        <h2 style={loginStyles.brandTitle}>ARC Control</h2>
        <span style={loginStyles.brandSub}>Authentication Panel</span>

        {error && (
          <div style={loginStyles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={loginStyles.formGroup}>
            <label style={loginStyles.label} htmlFor="email">
              Email Address
            </label>
            <input
              style={loginStyles.input}
              type="email"
              id="email"
              placeholder="admin@arcfilms.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ ...loginStyles.formGroup, marginBottom: "24px" }}>
            <label style={loginStyles.label} htmlFor="password">
              Password
            </label>
            <input
              style={loginStyles.input}
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={loginStyles.submitBtn} disabled={isLoading}>
            <span>{isLoading ? "Authenticating..." : "Sign In"}</span>
          </button>
        </form>
      </div>
    </main>
  );
}
