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
      background: "radial-gradient(circle at center, #0f172a 0%, #030306 100%)",
      color: "#f8fafc",
      fontFamily: "var(--font-sans)",
      position: "relative" as const,
      overflow: "hidden",
      padding: "20px",
    },
    // Floating glowing background spheres
    glowLeft: {
      position: "absolute" as const,
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(0,0,0,0) 70%)",
      top: "-100px",
      left: "-100px",
      filter: "blur(40px)",
      pointerEvents: "none" as const,
    },
    glowRight: {
      position: "absolute" as const,
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(0,0,0,0) 70%)",
      bottom: "-150px",
      right: "-150px",
      filter: "blur(50px)",
      pointerEvents: "none" as const,
    },
    card: {
      width: "100%",
      maxWidth: "460px",
      background: "rgba(20, 20, 32, 0.6)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      padding: "48px 40px",
      boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      zIndex: 2,
    },
    brandTitle: {
      fontFamily: "var(--font-display)",
      fontSize: "36px",
      letterSpacing: "3px",
      textAlign: "center" as const,
      textTransform: "uppercase" as const,
      margin: "0 0 8px 0",
      background: "linear-gradient(to right, #ffffff, #60a5fa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    brandSub: {
      fontSize: "11px",
      letterSpacing: "4px",
      color: "#3b82f6",
      textTransform: "uppercase" as const,
      fontWeight: "bold",
      textAlign: "center" as const,
      marginBottom: "36px",
      display: "block",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      marginBottom: "24px",
    },
    label: {
      fontSize: "11px",
      fontWeight: "600",
      textTransform: "uppercase" as const,
      letterSpacing: "1px",
      color: "#94a3b8",
    },
    input: {
      background: "rgba(13, 13, 24, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "6px",
      padding: "14px 18px",
      color: "#f8fafc",
      fontSize: "14px",
      outline: "none",
      transition: "all 0.3s",
      width: "100%",
    },
    submitBtn: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      letterSpacing: "1px",
      transition: "all 0.3s",
      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
      marginTop: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      textTransform: "uppercase" as const,
    },
    errorBox: {
      padding: "12px 16px",
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      borderRadius: "6px",
      color: "#f87171",
      fontSize: "13px",
      marginBottom: "24px",
      lineHeight: "1.5",
    },
  };

  return (
    <main style={loginStyles.container}>
      {/* Decorative Glows */}
      <div style={loginStyles.glowLeft}></div>
      <div style={loginStyles.glowRight}></div>

      {/* Login Card */}
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

          <div style={{ ...loginStyles.formGroup, marginBottom: "36px" }}>
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
