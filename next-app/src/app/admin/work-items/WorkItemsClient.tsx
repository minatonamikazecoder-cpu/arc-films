"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { triggerRevalidation } from "@/lib/revalidate";
import { dashboardStyles } from "../adminStyles";

interface Category {
  id: string;
  name: string;
  slug: string;
  display_name: string;
  section_title?: string;
  sort_order: number;
  is_active: boolean;
}

interface WorkItem {
  id: string;
  category_id: string;
  title: string;
  subtitle?: string;
  slug: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  alt_text?: string;
  aspect_ratio?: string;
  is_featured: boolean;
  is_home_showcase: boolean;
  sort_order: number;
  is_active: boolean;
  work_categories?: {
    name: string;
  };
}

export default function WorkItemsPage() {
  const supabase = createClient();
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [workItemForm, setWorkItemForm] = useState({
    category_id: "",
    title: "",
    subtitle: "",
    slug: "",
    media_type: "image", // 'image' | 'video' | 'youtube'
    media_url: "",
    thumbnail_url: "",
    alt_text: "",
    aspect_ratio: "16/9",
    is_featured: false,
    is_home_showcase: false,
    sort_order: 0,
    is_active: true,
  });

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("work_categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setCategories(data);
  }, [supabase]);

  const fetchWorkItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("work_items")
      .select("*, work_categories(name)")
      .order("sort_order", { ascending: true });
    if (!error && data) setWorkItems(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchCategories();
    fetchWorkItems();
  }, [fetchCategories, fetchWorkItems]);

  const resetWorkItemForm = () => {
    setWorkItemForm({
      category_id: categories[0]?.id || "",
      title: "",
      subtitle: "",
      slug: "",
      media_type: "image",
      media_url: "",
      thumbnail_url: "",
      alt_text: "",
      aspect_ratio: "16/9",
      is_featured: false,
      is_home_showcase: false,
      sort_order: 0,
      is_active: true,
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "media_url" | "thumbnail_url"
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
        setWorkItemForm((prev) => ({ ...prev, [fieldName]: data.url }));
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      alert("Error uploading file: " + errMsg);
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleWorkItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workItemForm.category_id) {
      alert("Please select a category first.");
      return;
    }

    const payload = {
      ...workItemForm,
      slug: workItemForm.slug || workItemForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };

    setFormLoading(true);
    if (editId) {
      const { error } = await supabase.from("work_items").update(payload).eq("id", editId);
      if (!error) {
        alert("Work item updated successfully!");
        setEditId(null);
        resetWorkItemForm();
        fetchWorkItems();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    } else {
      const { error } = await supabase.from("work_items").insert([payload]);
      if (!error) {
        alert("Work item created successfully!");
        resetWorkItemForm();
        fetchWorkItems();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    }
    setFormLoading(false);
  };

  const deleteWorkItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this work item?")) return;
    const { error } = await supabase.from("work_items").delete().eq("id", id);
    if (!error) {
      fetchWorkItems();
      triggerRevalidation();
    }
  };

  const startEditWorkItem = (item: WorkItem) => {
    setEditId(item.id);
    setWorkItemForm({
      category_id: item.category_id || "",
      title: item.title || "",
      subtitle: item.subtitle || "",
      slug: item.slug || "",
      media_type: item.media_type || "image",
      media_url: item.media_url || "",
      thumbnail_url: item.thumbnail_url || "",
      alt_text: item.alt_text || "",
      aspect_ratio: item.aspect_ratio || "16/9",
      is_featured: item.is_featured || false,
      is_home_showcase: item.is_home_showcase || false,
      sort_order: item.sort_order || 0,
      is_active: item.is_active !== undefined ? item.is_active : true,
    });
  };

  if (loading && categories.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "64px", color: "#475569" }}>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div style={dashboardStyles.panelHeader}>
        <h2 style={dashboardStyles.panelTitle}>Work Items Portfolio</h2>
      </div>

      {/* Form */}
      <div style={{ ...dashboardStyles.card, marginBottom: "40px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginTop: 0, marginBottom: "24px" }}>
          {editId ? "Edit Work Item" : "Add Portfolio Work Item"}
        </h3>
        <form onSubmit={handleWorkItemSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Work Category</label>
              <select
                style={dashboardStyles.formSelect}
                value={workItemForm.category_id}
                onChange={(e) => setWorkItemForm({ ...workItemForm, category_id: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.display_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Title</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. Redesign Project"
                value={workItemForm.title}
                onChange={(e) => setWorkItemForm({ ...workItemForm, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Subtitle / Sub-label</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. Brand Identity or Cinematic Film"
                value={workItemForm.subtitle}
                onChange={(e) => setWorkItemForm({ ...workItemForm, subtitle: e.target.value })}
              />
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Slug (Auto-generated if empty)</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. redesign-project"
                value={workItemForm.slug}
                onChange={(e) => setWorkItemForm({ ...workItemForm, slug: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Media Type</label>
              <select
                style={dashboardStyles.formSelect}
                value={workItemForm.media_type}
                onChange={(e) => setWorkItemForm({ ...workItemForm, media_type: e.target.value })}
                required
              >
                <option value="image">Static Image</option>
                <option value="video">Direct mp4 Video</option>
                <option value="youtube">YouTube Embed Link</option>
              </select>
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Media URL</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  style={{ ...dashboardStyles.formInput, flex: 1 }}
                  type="text"
                  placeholder="URL link to image, video mp4, or YouTube embed link"
                  value={workItemForm.media_url}
                  onChange={(e) => setWorkItemForm({ ...workItemForm, media_url: e.target.value })}
                  required
                />
                {workItemForm.media_type !== "youtube" && (
                  <div style={{ position: "relative" }}>
                    <input
                      type="file"
                      accept={workItemForm.media_type === "image" ? "image/*" : "video/*"}
                      onChange={(e) => handleFileUpload(e, "media_url")}
                      style={{ display: "none" }}
                      id="work-item-media-file"
                      disabled={uploadingField === "media_url"}
                    />
                    <label
                      htmlFor="work-item-media-file"
                      style={{
                        padding: "14px 18px",
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        color: "#475569",
                        cursor: uploadingField === "media_url" ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {uploadingField === "media_url" ? "Uploading..." : "Upload File"}
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Thumbnail URL (Optional)</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  style={{ ...dashboardStyles.formInput, flex: 1 }}
                  type="text"
                  placeholder="Cloudinary image URL for video poster"
                  value={workItemForm.thumbnail_url}
                  onChange={(e) => setWorkItemForm({ ...workItemForm, thumbnail_url: e.target.value })}
                />
                <div style={{ position: "relative" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "thumbnail_url")}
                    style={{ display: "none" }}
                    id="work-item-thumbnail-file"
                    disabled={uploadingField === "thumbnail_url"}
                  />
                  <label
                    htmlFor="work-item-thumbnail-file"
                    style={{
                      padding: "14px 18px",
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      color: "#475569",
                      cursor: uploadingField === "thumbnail_url" ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {uploadingField === "thumbnail_url" ? "Uploading..." : "Upload File"}
                  </label>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={dashboardStyles.formGroup}>
                <label style={dashboardStyles.formLabel}>Aspect Ratio</label>
                <select
                  style={dashboardStyles.formSelect}
                  value={workItemForm.aspect_ratio}
                  onChange={(e) => setWorkItemForm({ ...workItemForm, aspect_ratio: e.target.value })}
                >
                  <option value="16/9">16/9 (Default Landscape)</option>
                  <option value="9/16">9/16 (Vertical Form)</option>
                  <option value="1/1">1/1 (Square)</option>
                  <option value="4/3">4/3</option>
                </select>
              </div>

              <div style={dashboardStyles.formGroup}>
                <label style={dashboardStyles.formLabel}>Sort Order</label>
                <input
                  style={dashboardStyles.formInput}
                  type="number"
                  value={workItemForm.sort_order}
                  onChange={(e) => setWorkItemForm({ ...workItemForm, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "40px", marginBottom: "28px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={workItemForm.is_featured}
                onChange={(e) => setWorkItemForm({ ...workItemForm, is_featured: e.target.checked })}
              />
              Featured (Main Showcase)
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={workItemForm.is_home_showcase}
                onChange={(e) => setWorkItemForm({ ...workItemForm, is_home_showcase: e.target.checked })}
              />
              Show in Carousel Slider
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={workItemForm.is_active}
                onChange={(e) => setWorkItemForm({ ...workItemForm, is_active: e.target.checked })}
              />
              Active
            </label>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" disabled={formLoading} style={dashboardStyles.formSubmit}>
              {formLoading ? "Saving..." : editId ? "Update Item" : "Create Item"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  resetWorkItemForm();
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
          Current Work Items List
        </h3>
        {workItems.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>No items found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={dashboardStyles.table}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Title</th>
                  <th style={dashboardStyles.th}>Category</th>
                  <th style={dashboardStyles.th}>Type</th>
                  <th style={dashboardStyles.th}>Order</th>
                  <th style={dashboardStyles.th}>Featured</th>
                  <th style={dashboardStyles.th}>Status</th>
                  <th style={dashboardStyles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workItems.map((item) => (
                  <tr key={item.id} style={dashboardStyles.tr}>
                    <td style={dashboardStyles.td}>
                      <div style={{ fontWeight: "600" }}>{item.title}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{item.subtitle}</div>
                    </td>
                    <td style={dashboardStyles.td}>{item.work_categories?.name || "N/A"}</td>
                    <td style={dashboardStyles.td}>
                      <span style={{ fontSize: "12px", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", color: "#475569", border: "1px solid #cbd5e1" }}>
                        {item.media_type}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>{item.sort_order}</td>
                    <td style={dashboardStyles.td}>
                      {item.is_featured && "⭐ Featured "}
                      {item.is_home_showcase && "🎠 Carousel"}
                    </td>
                    <td style={dashboardStyles.td}>
                      <span
                        style={{
                          color: item.is_active ? "#059669" : "#dc2626",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => startEditWorkItem(item)} style={dashboardStyles.btnSecondary}>
                          Edit
                        </button>
                        <button onClick={() => deleteWorkItem(item.id)} style={dashboardStyles.btnDanger}>
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
