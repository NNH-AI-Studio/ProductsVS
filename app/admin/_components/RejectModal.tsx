"use client"

import type React from "react"

import { useState } from "react"

interface Comparison {
  id: string
  product1: string
  product2: string
}

interface RejectModalProps {
  comparison: Comparison
  onReject: (id: string, reason: string) => void
  onClose: () => void
}

export default function RejectModal({ comparison, onReject, onClose }: RejectModalProps) {
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason.trim()) return

    setLoading(true)
    await onReject(comparison.id, reason)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full border-2 border-gray-300">
        <div className="border-b-2 border-gray-200 p-6">
          <h2 className="text-2xl font-bold">Reject Comparison</h2>
          <p className="text-gray-600 mt-2">
            {comparison.product1} vs {comparison.product2}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <label className="block mb-2 font-semibold text-sm">Reason for rejection</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for rejecting this comparison..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none resize-none"
            required
            disabled={loading}
          />

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 font-semibold transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors disabled:opacity-50"
              disabled={loading || !reason.trim()}
            >
              {loading ? "Rejecting..." : "Reject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
