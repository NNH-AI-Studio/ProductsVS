import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const supabase = await createClient()

    const [
      totalComparisons,
      pendingComparisons,
      approvedComparisons,
      rejectedComparisons,
      todayComparisons,
      weekComparisons,
      monthComparisons,
      categoryStats,
    ] = await Promise.all([
      supabase.from("comparisons_dynamic").select("id", { count: "exact", head: true }),
      supabase.from("comparisons_dynamic").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("comparisons_dynamic").select("id", { count: "exact", head: true }).eq("status", "approved"),
      supabase.from("comparisons_dynamic").select("id", { count: "exact", head: true }).eq("status", "rejected"),
      supabase
        .from("comparisons_dynamic")
        .select("id", { count: "exact", head: true })
        .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
      supabase
        .from("comparisons_dynamic")
        .select("id", { count: "exact", head: true })
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      supabase
        .from("comparisons_dynamic")
        .select("id", { count: "exact", head: true })
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      supabase.from("comparisons_dynamic").select("category"),
    ])

    const categoryCounts: Record<string, number> = {}
    if (categoryStats.data) {
      categoryStats.data.forEach((item: any) => {
        const category = item.category || "Uncategorized"
        categoryCounts[category] = (categoryCounts[category] || 0) + 1
      })
    }

    const analytics = {
      total: totalComparisons.count || 0,
      pending: pendingComparisons.count || 0,
      approved: approvedComparisons.count || 0,
      rejected: rejectedComparisons.count || 0,
      today: todayComparisons.count || 0,
      thisWeek: weekComparisons.count || 0,
      thisMonth: monthComparisons.count || 0,
      byCategory: categoryCounts,
      approvalRate:
        totalComparisons.count && totalComparisons.count > 0
          ? Math.round(((approvedComparisons.count || 0) / totalComparisons.count) * 100)
          : 0,
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("[Admin Analytics Error]:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
