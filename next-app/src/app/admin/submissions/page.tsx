"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { dashboardStyles } from "../adminStyles";

interface Submission {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function SubmissionsPage() {
  const supabase = createClient();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setSubmissions(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const toggleSubmissionRead = async (id: string, currentRead: boolean) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: !currentRead })
      .eq("id", id);
    if (!error) fetchSubmissions();
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);
    if (!error) fetchSubmissions();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "64px", color: "#f8fafc" }}>
        <span>Loading submissions...</span>
      </div>
    );
  }

  return (
    <div>
      <div style={dashboardStyles.panelHeader}>
        <h2 style={dashboardStyles.panelTitle}>Contact Submissions</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {submissions.length === 0 ? (
          <div style={{ ...dashboardStyles.card, textAlign: "center", color: "#64748b", padding: "64px" }}>
            No form submissions received yet.
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub.id}
              style={{
                ...dashboardStyles.card,
                borderLeft: sub.is_read ? "1px solid rgba(255,255,255,0.05)" : "3px solid #3b82f6",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div>
                  <h4 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 6px 0", color: "#ffffff" }}>
                    {sub.first_name} {sub.last_name || ""}
                  </h4>
                  <a href={`mailto:${sub.email}`} style={{ fontSize: "14px", color: "#60a5fa", transition: "color 0.2s" }}>
                    {sub.email}
                  </a>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => toggleSubmissionRead(sub.id, sub.is_read)}
                    style={{
                      padding: "8px 16px",
                      background: sub.is_read ? "transparent" : "#3b82f6",
                      border: "1px solid #3b82f6",
                      color: sub.is_read ? "#60a5fa" : "#ffffff",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  >
                    {sub.is_read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button onClick={() => deleteSubmission(sub.id)} style={dashboardStyles.btnDanger}>
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <span style={dashboardStyles.formLabel}>Interested In</span>
                  <div style={{ fontSize: "15px", marginTop: "6px", color: "#e2e8f0" }}>{sub.service || "N/A"}</div>
                </div>
                <div>
                  <span style={dashboardStyles.formLabel}>Approximate Budget</span>
                  <div style={{ fontSize: "15px", marginTop: "6px", color: "#e2e8f0" }}>{sub.budget || "N/A"}</div>
                </div>
              </div>

              <div>
                <span style={dashboardStyles.formLabel}>Message / Vision</span>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#cbd5e1", margin: "10px 0 0 0", whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.2)", padding: "16px", borderRadius: "6px" }}>
                  {sub.message}
                </p>
              </div>

              <div style={{ marginTop: "20px", fontSize: "12px", color: "#64748b", textAlign: "right" }}>
                Submitted: {new Date(sub.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
