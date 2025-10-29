"use client"

import { useState, useEffect } from "react"
import ComparisonCard from "./ComparisonCard"
import PreviewModal from "./PreviewModal"
import RejectModal from "./RejectModal"

interface Comparison {
  id: string
  product1: string
  product2: string
  category: string
  language: string
  created_at: string
  content: any
}

interface PendingListProps {
  onUpdate: () => void
}

export default function PendingList({ onUpdate }: PendingListProps) {
  const [comparisons, setComparisons] = useState<Comparison[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")
  const [selectedComparison, setSelectedComparison] = useState<Comparison | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showReject, setShowReject] = useState(false)

  useEffect(() => {
    loadPending()
  }, [sortBy])

  const loadPending = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/pending?sort=${sortBy}`)
      const data = await response.json()
      if (data.success) {
        setComparisons(data.comparisons)
      }
    } catch (error) {
      console.error("[v0] Failed to load pending comparisons:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()
      if (data.success) {
        await loadPending()
        onUpdate()
      }
    } catch (error) {
      console.error("[v0] Failed to approve:", error)
    }
  }

  const handleReject = async (id: string, reason: string) => {
    try {
      const response = await fetch("/api/admin/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, reason }),
      })
      const data = await response.json()
      if (data.success) {
        setShowReject(false)
        setSelectedComparison(null)
        await loadPending()
        onUpdate()
      }
    } catch (error) {
      console.error("[v0] Failed to reject:", error)
    }
  }

  const handlePreview = (comparison: Comparison) => {
    setSelectedComparison(comparison)
    setShowPreview(true)
  }

  const handleRejectClick = (comparison: Comparison) => {
    setSelectedComparison(comparison)
    setShowReject(true)
  }

  return (
    <div className="bg-white border-2 border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>⏳</span>
          Pending Review ({comparisons.length})
        </h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
          className="px-4 py-2 border-2 border-gray-300 focus:border-black focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
        </div>
      ) : comparisons.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No pending comparisons</p>
          <p className="text-sm mt-2">All caught up! 🎉</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comparisons.map((comparison, index) => (
            <ComparisonCard
              key={comparison.id}
              comparison={comparison}
              index={index}
              onPreview={handlePreview}
              onApprove={handleApprove}
              onReject={handleRejectClick}
            />
          ))}
        </div>
      )}

      {showPreview && selectedComparison && (
        <PreviewModal
          comparison={selectedComparison}
          onClose={() => {
            setShowPreview(false)
            setSelectedComparison(null)
          }}
        />
      )}

      {showReject && selectedComparison && (
        <RejectModal
          comparison={selectedComparison}
          onReject={handleReject}
          onClose={() => {
            setShowReject(false)
            setSelectedComparison(null)
          }}
        />
      )}
    </div>
  )
}
