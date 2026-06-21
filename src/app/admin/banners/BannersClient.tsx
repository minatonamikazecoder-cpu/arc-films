"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { triggerRevalidation } from "@/lib/revalidate";
import { dashboardStyles } from "../adminStyles";

interface Banner {
  id: string;
  section: string;
  media_type: string;
  media_url: string;
  alt_text?: string;
  is_active: boolean;
  sort_order: number;
}

export default function BannersPage() {
  const supabase = createClient();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [bannerForm, setBannerForm] = useState({
    section: "hero",
    media_type: "image",
    media_url: "",
    alt_text: "",
    is_active: true,
    sort_order: 0,
  });

  const fetchBanners = useCallback(async () => {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setBanners(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const resetBannerForm = () => {
    setBannerForm({
      section: "hero",
      media_type: "image",
      media_url: "",
      alt_text: "",
      is_active: true,
      sort_order: 0,
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "media_url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (data.url) {
        setBannerForm((prev) => ({ ...prev, [fieldName]: data.url }));
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      alert("Error uploading file: " + errMsg);
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    if (editId) {
      const { error } = await supabase.from("banners").update(bannerForm).eq("id", editId);
      if (!error) {
        alert("Banner updated successfully!");
        setEditId(null);
        resetBannerForm();
        fetchBanners();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    } else {
      const { error } = await supabase.from("banners").insert([bannerForm]);
      if (!error) {
        alert("Banner created successfully!");
        resetBannerForm();
        fetchBanners();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    }
    setFormLoading(false);
  };

  const deleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (!error) {
      fetchBanners();
      triggerRevalidation();
    }
  };

  const startEditBanner = (ban: Banner) => {
    setEditId(ban.id);
    setBannerForm({
      section: ban.section || "hero",
      media_type: ban.media_type || "image",
      media_url: ban.media_url || "",
      alt_text: ban.alt_text || "",
      is_active: ban.is_active !== undefined ? ban.is_active : true,
      sort_order: ban.sort_order || 0,
    });
  };

  if (loading && banners.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "64px", color: "#f8fafc" }}>
        <span>Loading banners...</span>
      </div>
    );
  }

  return (
    <div>
      <div style={dashboardStyles.panelHeader}>
        <h2 style={dashboardStyles.panelTitle}>Banner Settings</h2>
      </div>

      {/* Form */}
      <div style={{ ...dashboardStyles.card, marginBottom: "40px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginTop: 0, marginBottom: "24px" }}>
          {editId ? "Edit Banner" : "Add Banner Graphic"}
        </h3>
        <form onSubmit={handleBannerSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Target Section</label>
              <select
                style={dashboardStyles.formSelect}
                value={bannerForm.section}
                onChange={(e) => setBannerForm({ ...bannerForm, section: e.target.value })}
                required
              >
                <option value="hero">Hero Background (Home)</option>
                <option value="statement">Statement Strip</option>
                <option value="about">About Page Feature</option>
              </select>
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Media Type</label>
              <select
                style={dashboardStyles.formSelect}
                value={bannerForm.media_type}
                onChange={(e) => setBannerForm({ ...bannerForm, media_type: e.target.value })}
                required
              >
                <option value="image">Static Image</option>
                <option value="video">Direct mp4 Video</option>
              </select>
            </div>
          </div>

          <div style={dashboardStyles.formGroup}>
            <label style={dashboardStyles.formLabel}>Media URL (Cloudinary)</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                style={{ ...dashboardStyles.formInput, flex: 1 }}
                type="text"
                placeholder="https://res.cloudinary.com/..."
                value={bannerForm.media_url}
                onChange={(e) => setBannerForm({ ...bannerForm, media_url: e.target.value })}
                required
              />
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  accept={bannerForm.media_type === "image" ? "image/*" : "video/*"}
                  onChange={(e) => handleFileUpload(e, "media_url")}
                  style={{ display: "none" }}
                  id="banner-media-file"
                  disabled={uploadingField === "media_url"}
                />
                <label
                  htmlFor="banner-media-file"
                  style={{
                    padding: "14px 18px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                    color: "#cbd5e1",
                    cursor: uploadingField === "media_url" ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  {uploadingField === "media_url" ? "Uploading..." : "Upload File"}
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Alt Text / Label</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="Brief label for screenreaders"
                value={bannerForm.alt_text}
                onChange={(e) => setBannerForm({ ...bannerForm, alt_text: e.target.value })}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={dashboardStyles.formGroup}>
                <label style={dashboardStyles.formLabel}>Sort Order</label>
                <input
                  style={dashboardStyles.formInput}
                  type="number"
                  value={bannerForm.sort_order}
                  onChange={(e) => setBannerForm({ ...bannerForm, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "14px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={bannerForm.is_active}
                    onChange={(e) => setBannerForm({ ...bannerForm, is_active: e.target.checked })}
                  />
                  Active
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button type="submit" disabled={formLoading} style={dashboardStyles.formSubmit}>
              {formLoading ? "Saving..." : editId ? "Update Banner" : "Create Banner"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  resetBannerForm();
                }}
                style={dashboardStyles.btnSecondary}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div style={dashboardStyles.card}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginTop: 0, marginBottom: "24px" }}>
          Current Banners List
        </h3>
        {banners.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>No banners found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={dashboardStyles.table}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Section</th>
                  <th style={dashboardStyles.th}>Media Type</th>
                  <th style={dashboardStyles.th}>Media Link Preview</th>
                  <th style={dashboardStyles.th}>Order</th>
                  <th style={dashboardStyles.th}>Status</th>
                  <th style={dashboardStyles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((ban) => (
                  <tr key={ban.id} style={dashboardStyles.tr}>
                    <td style={{ ...dashboardStyles.td, fontWeight: "600", textTransform: "uppercase" }}>
                      {ban.section}
                    </td>
                    <td style={dashboardStyles.td}>
                      <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px" }}>
                        {ban.media_type}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>
                      <a
                        href={ban.media_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: "13px", color: "#60a5fa", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", display: "inline-block", whiteSpace: "nowrap" }}
                      >
                        {ban.media_url}
                      </a>
                    </td>
                    <td style={dashboardStyles.td}>{ban.sort_order}</td>
                    <td style={dashboardStyles.td}>
                      <span
                        style={{
                          color: ban.is_active ? "#34d399" : "#f87171",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {ban.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => startEditBanner(ban)} style={dashboardStyles.btnSecondary}>
                          Edit
                        </button>
                        <button onClick={() => deleteBanner(ban.id)} style={dashboardStyles.btnDanger}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
