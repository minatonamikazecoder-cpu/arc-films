import React from "react";
import { createClient } from "@/lib/supabase/server";
import WorkPageClient, { Category, WorkItem } from "./WorkPageClient";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const supabase = await createClient();

  const { data: categoriesData } = await supabase
    .from("work_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const { data: workItemsData } = await supabase
    .from("work_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const categories = (categoriesData || []) as Category[];
  const workItems = (workItemsData || []) as WorkItem[];

  return <WorkPageClient categories={categories} workItems={workItems} />;
}
