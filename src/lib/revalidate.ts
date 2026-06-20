/**
 * Utility to trigger on-demand page revalidation for public pages
 * (/, /work, /services, /about).
 * This endpoint verifies the user's Supabase session on the server.
 */
export async function triggerRevalidation() {
  try {
    const response = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to trigger revalidation");
    }

    const data = await response.json();
    console.log("Successfully revalidated paths:", data.paths);
    return data;
  } catch (error) {
    console.error("Error triggering revalidation:", error);
    throw error;
  }
}
