"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { triggerRevalidation } from "@/lib/revalidate";
import { dashboardStyles } from "./adminStyles";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    const { count } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);
    setUnreadCount(count || 0);
  }, [supabase]);

  useEffect(() => {
    fetchUnreadCount();

    // Query count every 10 seconds to keep badge fresh
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const [syncing, setSyncing] = useState(false);

  const handleSyncCache = async () => {
    setSyncing(true);
    try {
      await triggerRevalidation();
      alert("Live site cache successfully updated!");
    } catch (e) {
      alert("Failed to sync cache: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/admin/login");
  };

  const navItems = [
    { id: "submissions", label: "Form Submissions", path: "/admin/submissions" },
    { id: "work_items", label: "Work Items", path: "/admin/work-items" },
    { id: "categories", label: "Work Categories", path: "/admin/categories" },
    { id: "services", label: "Services Offered", path: "/admin/services" },
    { id: "banners", label: "Banner Settings", path: "/admin/banners" },
  ];

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div style={dashboardStyles.container}>
      {/* Sidebar */}
      <aside style={dashboardStyles.sidebar}>
        <div style={dashboardStyles.sidebarHeader}>
          <h1 style={dashboardStyles.sidebarBrand}>ARC Control</h1>
          <span style={dashboardStyles.sidebarSub}>CMS Dashboard</span>
        </div>

        <nav style={dashboardStyles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                style={dashboardStyles.navItem(isActive)}
              >
                <span>{item.label}</span>
                {item.id === "submissions" && unreadCount > 0 && (
                  <span style={dashboardStyles.badge}>{unreadCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div style={dashboardStyles.logoutBtnContainer}>
          <button 
            onClick={handleSyncCache} 
            disabled={syncing}
            style={{
              ...dashboardStyles.logoutBtn,
              background: syncing ? "rgba(255,255,255,0.02)" : "rgba(59,130,246,0.08)",
              color: syncing ? "#64748b" : "#60a5fa",
              borderColor: syncing ? "rgba(255,255,255,0.05)" : "rgba(59,130,246,0.25)",
              marginBottom: "10px"
            }}
          >
            {syncing ? "Syncing..." : "Sync Live Site"}
          </button>
          <button onClick={handleLogout} style={dashboardStyles.logoutBtn}>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={dashboardStyles.main}>{children}</main>
    </div>
  );
}
