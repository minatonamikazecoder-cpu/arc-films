"use client";

export const dynamic = "force-dynamic";

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

export default function CategoriesPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    display_name: "",
    section_title: "",
    sort_order: 0,
    is_active: true,
  });

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("work_categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setCategories(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      slug: "",
      display_name: "",
      section_title: "",
      sort_order: 0,
      is_active: true,
    });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const payload = {
      ...categoryForm,
      slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };

    if (editId) {
      const { error } = await supabase.from("work_categories").update(payload).eq("id", editId);
      if (!error) {
        alert("Category updated successfully!");
        setEditId(null);
        resetCategoryForm();
        fetchCategories();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    } else {
      const { error } = await supabase.from("work_categories").insert([payload]);
      if (!error) {
        alert("Category created successfully!");
        resetCategoryForm();
        fetchCategories();
        triggerRevalidation();
      } else {
        alert("Error: " + error.message);
      }
    }
    setFormLoading(false);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? All associated work items will be deleted!")) return;
    const { error } = await supabase.from("work_categories").delete().eq("id", id);
    if (!error) {
      fetchCategories();
      triggerRevalidation();
    }
  };

  const startEditCategory = (cat: Category) => {
    setEditId(cat.id);
    setCategoryForm({
      name: cat.name || "",
      slug: cat.slug || "",
      display_name: cat.display_name || "",
      section_title: cat.section_title || "",
      sort_order: cat.sort_order || 0,
      is_active: cat.is_active !== undefined ? cat.is_active : true,
    });
  };

  if (loading && categories.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "64px", color: "#f8fafc" }}>
        <span>Loading categories...</span>
      </div>
    );
  }

  return (
    <div>
      <div style={dashboardStyles.panelHeader}>
        <h2 style={dashboardStyles.panelTitle}>Work Categories</h2>
      </div>

      {/* Form */}
      <div style={{ ...dashboardStyles.card, marginBottom: "40px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginTop: 0, marginBottom: "24px" }}>
          {editId ? "Edit Category" : "Add Portfolio Category"}
        </h3>
        <form onSubmit={handleCategorySubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Category Name (System)</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. Logo Design"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                required
              />
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Slug (Auto-generated if empty)</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. logo-design"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Display Tab Label</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. Logo Design"
                value={categoryForm.display_name}
                onChange={(e) => setCategoryForm({ ...categoryForm, display_name: e.target.value })}
                required
              />
            </div>

            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Section Title Header</label>
              <input
                style={dashboardStyles.formInput}
                type="text"
                placeholder="e.g. Logo Design & Branding"
                value={categoryForm.section_title}
                onChange={(e) => setCategoryForm({ ...categoryForm, section_title: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "28px" }}>
            <div style={dashboardStyles.formGroup}>
              <label style={dashboardStyles.formLabel}>Sort Order</label>
              <input
                style={dashboardStyles.formInput}
                type="number"
                value={categoryForm.sort_order}
                onChange={(e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "14px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={categoryForm.is_active}
                  onChange={(e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked })}
                />
                Active
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" disabled={formLoading} style={dashboardStyles.formSubmit}>
              {formLoading ? "Saving..." : editId ? "Update Category" : "Create Category"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  resetCategoryForm();
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
          Current Categories List
        </h3>
        {categories.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>No categories found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={dashboardStyles.table}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Tab Label</th>
                  <th style={dashboardStyles.th}>Slug</th>
                  <th style={dashboardStyles.th}>Section Title</th>
                  <th style={dashboardStyles.th}>Order</th>
                  <th style={dashboardStyles.th}>Status</th>
                  <th style={dashboardStyles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} style={dashboardStyles.tr}>
                    <td style={{ ...dashboardStyles.td, fontWeight: "600" }}>
                      {cat.display_name}
                    </td>
                    <td style={dashboardStyles.td}>{cat.slug}</td>
                    <td style={dashboardStyles.td}>{cat.section_title || "N/A"}</td>
                    <td style={dashboardStyles.td}>{cat.sort_order}</td>
                    <td style={dashboardStyles.td}>
                      <span
                        style={{
                          color: cat.is_active ? "#34d399" : "#f87171",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {cat.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => startEditCategory(cat)} style={dashboardStyles.btnSecondary}>
                          Edit
                        </button>
                        <button onClick={() => deleteCategory(cat.id)} style={dashboardStyles.btnDanger}>
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
