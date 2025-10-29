"use client"

import { useEffect, useState } from "react"

interface Analytics {
  total: number
  pending: number
  approved: number
  rejected: number
  today: number
  thisWeek: number
  thisMonth: number
  byCategory: Record<string, number>
  approvalRate: number
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading analytics...</div>
  }

  if (!analytics) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Failed to load analytics</div>
  }

  return (
    <div style={{ marginBottom: "3rem" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: 700 }}>Analytics Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ padding: "1.5rem", background: "#f0f9ff", borderRadius: "12px", border: "2px solid #3b82f6" }}>
          <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>Today</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#3b82f6" }}>{analytics.today}</div>
          <div style={{ fontSize: "0.875rem", opacity: 0.7 }}>New submissions</div>
        </div>

        <div style={{ padding: "1.5rem", background: "#f0fdf4", borderRadius: "12px", border: "2px solid #22c55e" }}>
          <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>This Week</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#22c55e" }}>{analytics.thisWeek}</div>
          <div style={{ fontSize: "0.875rem", opacity: 0.7 }}>New submissions</div>
        </div>

        <div style={{ padding: "1.5rem", background: "#fef3c7", borderRadius: "12px", border: "2px solid #f59e0b" }}>
          <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>This Month</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f59e0b" }}>{analytics.thisMonth}</div>
          <div style={{ fontSize: "0.875rem", opacity: 0.7 }}>New submissions</div>
        </div>

        <div style={{ padding: "1.5rem", background: "#f3e8ff", borderRadius: "12px", border: "2px solid #a855f7" }}>
          <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>Approval Rate</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#a855f7" }}>{analytics.approvalRate}%</div>
          <div style={{ fontSize: "0.875rem", opacity: 0.7 }}>Overall quality</div>
        </div>
      </div>

      <div style={{ padding: "2rem", background: "#fff", borderRadius: "12px", border: "2px solid #e5e7eb" }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", fontWeight: 600 }}>Comparisons by Category</h3>
        <div style={{ display: "grid", gap: "1rem" }}>
          {Object.entries(analytics.byCategory)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <div key={category} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ minWidth: "150px", fontWeight: 500 }}>{category}</div>
                <div
                  style={{ flex: 1, height: "24px", background: "#e5e7eb", borderRadius: "12px", overflow: "hidden" }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(count / analytics.total) * 100}%`,
                      background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
                <div style={{ minWidth: "60px", textAlign: "right", fontWeight: 600 }}>{count}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
