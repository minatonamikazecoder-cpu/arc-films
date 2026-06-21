import React from "react";
import { createPublicClient } from "@/lib/supabase/public";
import WorkPageClient, { Category, WorkItem } from "./WorkPageClient";

export const revalidate = 31536000; // Revalidate on-demand (indefinite cache, 1 year TTL)

export default async function WorkPage() {
  const supabase = createPublicClient();

  const [categoriesResult, workItemsResult] = await Promise.all([
    supabase
      .from("work_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("work_items")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const categories = (categoriesResult.data || []) as Category[];
  const workItems = (workItemsResult.data || []) as WorkItem[];

  return <WorkPageClient categories={categories} workItems={workItems} />;
}
