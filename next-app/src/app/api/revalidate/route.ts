import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Secure the endpoint so only authenticated admins can trigger revalidation
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Default paths to revalidate
    const paths = ["/", "/work", "/services", "/about"];
    
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ 
      revalidated: true, 
      paths,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to revalidate" },
      { status: 500 }
    );
  }
}
