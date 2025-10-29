"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import StatsCards from "./StatsCards"
import PendingList from "./PendingList"
import ActivityLog from "./ActivityLog"

interface Admin {
  id: string
  email: string
  name: string
}

interface Stats {
  totalComparisons: number
  pendingReviews: number
  approvedToday: number
  rejectedToday: number
}

export default function AdminDashboardClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth")
      const data = await response.json()

      if (data.authenticated) {
        setIsAuthenticated(true)
        setAdmin(data.admin)
        await loadStats()
      } else {
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("[v0] Auth check error:", error)
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("[v0] Failed to load stats:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  const refreshData = () => {
    loadStats()
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-extrabold flex items-center gap-2">
                <span>🎛️</span>
                <span>
                  Admin Panel - Products<span className="font-normal">VS</span>
                </span>
              </h1>
              <p className="text-sm text-gray-600 mt-1">Welcome back, {admin?.name || admin?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Pending Reviews Section */}
        <div className="mt-8">
          <PendingList onUpdate={refreshData} />
        </div>

        {/* Activity Log */}
        <div className="mt-8">
          <ActivityLog />
        </div>
      </main>
    </div>
  )
}
