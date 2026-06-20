"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { triggerRevalidation } from "@/lib/revalidate";
import { dashboardStyles } from "../adminStyles";

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description?: string;
  icon_svg?: string;
  category_label?: string;
  includes: string | string[];
  preview_media_type?: string;
  preview_media_url?: string;
  sort_order: number;
  is_active: boolean;
}

export default function ServicesPage() {
  const supabase = createClient();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState({
    title: "",
    slug: "",
    short_description: "",
    long_description: "",
    icon_svg: "",
    category_label: "",
    includes: "", // Comma-separated string, parsed to array on save
    preview_media_type: "image",
    preview_media_url: "",
    sort_order: 0,
    is_active: true,
  });

  const fetchServices = useCallback(async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setServices(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const resetServiceForm = () => {
    setServiceForm({
      title: "",
      slug: "",
      short_description: "",
      long_description: "",
      icon_svg: "",
      category_label: "",
      includes: "",
      preview_media_type: "image",
      preview_media_url: "",
      sort_order: 0,
      is_active: true,
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "preview_media_url"
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
        setServiceForm((prev) => ({ ...prev, [fieldName]: data.url }));
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      alert("Error uploading file: " + errMsg);
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const includesArray = serviceForm.includes
      ? serviceForm.includes.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];

    const payload = {
      ...serviceForm,
      includes: includesArray,
      slug: serviceForm.slug || serviceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };

    if (editId) {
      const { error } = await supabase.from("services").update(payload).eq("id", editId);
      if (!error) {
        alert("Service updated successfully!");
        setEditId(null);
        resetServiceForm();
        fetchServices();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    } else {
      const { error } = await supabase.from("services").insert([payload]);
      if (!error) {
        alert("Service created successfully!");
        resetServiceForm();
        fetchServices();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    }
    setFormLoading(false);
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (!error) {
      fetchServices();
      triggerRevalidation();
    }
  };

  const startEditService = (srv: Service) => {
    setEditId(srv.id);

    let includesStr = "";
    if (srv.includes) {
      try {
        const arr = typeof srv.includes === "string" ? JSON.parse(srv.includes) : srv.includes;
        if (Array.isArray(arr)) {
          includesStr = arr.join(", ");
        }
      } catch {
        includesStr = "";
      }
    }

    setServiceForm({
      title: srv.title || "",
      slug: srv.slug || "",
      short_description: srv.short_description || "",
      long_description: srv.long_description || "",
      icon_svg: srv.icon_svg || "",
      category_label: srv.category_label || "",
      includes: includesStr,
      preview_media_type: srv.preview_media_type || "image",
      preview_media_url: srv.preview_media_url || "",
      sort_order: srv.sort_order || 0,
      is_active: srv.is_active !== undefined ? srv.is_active : true,
    });
  };

  if (loading && services.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "64px", color: "#f8fafc" }}>
        <span>Loading services Offered...</span>
      </div>
    );
  }

  return (
    <div>
      <div style={dashboardStyles.panelHeader}>
        <h2 style={dashboardStyles.panelTitle}>Services Offered</h2>
      </div>

      {/* Form */}
      <div style={{ ...dashboardStyles.card, marginBottom: "40px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginTop: 0, marginBottom: "24px" }}>
          {editId ? "Edit Service" : "Add Service Offered"}
        </h3>
        <form onSubmit={handleServiceSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Service Title</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. Video Production"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                required
              />
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Slug (Auto-generated if empty)</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. video-production"
                value={serviceForm.slug}
                onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Short Description (Home Grid)</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="Brief summary card description"
                value={serviceForm.short_description}
                onChange={(e) => setServiceForm({ ...serviceForm, short_description: e.target.value })}
                required
              />
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Category Label (Service Page Section)</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. Film & Cinema"
                value={serviceForm.category_label}
                onChange={(e) => setServiceForm({ ...serviceForm, category_label: e.target.value })}
              />
            </div>
          </div>

          <div style={dashboardStyles.formGroup}>
            <label style={dashboardStyles.formLabel}>Long Description (Services Details Page)</label>
            <textarea
              style={{ ...dashboardStyles.formInput, height: "100px", resize: "vertical" }}
              placeholder="Full detail description of the service offered..."
              value={serviceForm.long_description}
              onChange={(e) => setServiceForm({ ...serviceForm, long_description: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Icon SVG (Markup / Raw SVG String)</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="<svg>...</svg> icon tag"
                value={serviceForm.icon_svg}
                onChange={(e) => setServiceForm({ ...serviceForm, icon_svg: e.target.value })}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={dashboardStyles.formGroup}>
                <label style={dashboardStyles.formLabel}>Sort Order</label>
                <input
                  style={dashboardStyles.formInput}
                  type="number"
                  value={serviceForm.sort_order}
                  onChange={(e) => setServiceForm({ ...serviceForm, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div style={dashboardStyles.formGroup}>
            <label style={dashboardStyles.formLabel}>What&apos;s Included (Comma-separated list)</label>
            <input
              style={dashboardStyles.formInput}
              type="text"
              placeholder="Concept & Scriptwriting, Editing, Color Grading"
              value={serviceForm.includes}
              onChange={(e) => setServiceForm({ ...serviceForm, includes: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Preview Media Type</label>
              <select
                style={dashboardStyles.formSelect}
                value={serviceForm.preview_media_type}
                onChange={(e) => setServiceForm({ ...serviceForm, preview_media_type: e.target.value })}
              >
                <option value="image">Static Image</option>
                <option value="video">Direct mp4 Video</option>
                <option value="youtube">YouTube Embed Link</option>
              </select>
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Preview Media URL</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  style={{ ...dashboardStyles.formInput, flex: 1 }}
                  type="text"
                  placeholder="Cloudinary URL"
                  value={serviceForm.preview_media_url}
                  onChange={(e) => setServiceForm({ ...serviceForm, preview_media_url: e.target.value })}
                />
                {serviceForm.preview_media_type !== "youtube" && (
                  <div style={{ position: "relative" }}>
                    <input
                      type="file"
                      accept={serviceForm.preview_media_type === "image" ? "image/*" : "video/*"}
                      onChange={(e) => handleFileUpload(e, "preview_media_url")}
                      style={{ display: "none" }}
                      id="service-media-file"
                      disabled={uploadingField === "preview_media_url"}
                    />
                    <label
                      htmlFor="service-media-file"
                      style={{
                        padding: "14px 18px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "6px",
                        color: "#cbd5e1",
                        cursor: uploadingField === "preview_media_url" ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {uploadingField === "preview_media_url" ? "Uploading..." : "Upload File"}
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={serviceForm.is_active}
                onChange={(e) => setServiceForm({ ...serviceForm, is_active: e.target.checked })}
              />
              Active (Visible on Homepage/Services)
            </label>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" disabled={formLoading} style={dashboardStyles.formSubmit}>
              {formLoading ? "Saving..." : editId ? "Update Service" : "Create Service"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  resetServiceForm();
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
          Current Services List
        </h3>
        {services.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>No services found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={dashboardStyles.table}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Title</th>
                  <th style={dashboardStyles.th}>Category Header</th>
                  <th style={dashboardStyles.th}>Preview Type</th>
                  <th style={dashboardStyles.th}>Order</th>
                  <th style={dashboardStyles.th}>Status</th>
                  <th style={dashboardStyles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((srv) => (
                  <tr key={srv.id} style={dashboardStyles.tr}>
                    <td style={{ ...dashboardStyles.td, fontWeight: "600" }}>
                      {srv.title}
                    </td>
                    <td style={dashboardStyles.td}>{srv.category_label || "N/A"}</td>
                    <td style={dashboardStyles.td}>
                      <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px" }}>
                        {srv.preview_media_type || "N/A"}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>{srv.sort_order}</td>
                    <td style={dashboardStyles.td}>
                      <span
                        style={{
                          color: srv.is_active ? "#34d399" : "#f87171",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {srv.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => startEditService(srv)} style={dashboardStyles.btnSecondary}>
                          Edit
                        </button>
                        <button onClick={() => deleteService(srv.id)} style={dashboardStyles.btnDanger}>
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
