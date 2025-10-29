"use client"

interface Comparison {
  id: string
  product1: string
  product2: string
  category: string
  language: string
  created_at: string
}

interface ComparisonCardProps {
  comparison: Comparison
  index: number
  onPreview: (comparison: Comparison) => void
  onApprove: (id: string) => void
  onReject: (comparison: Comparison) => void
}

export default function ComparisonCard({ comparison, index, onPreview, onApprove, onReject }: ComparisonCardProps) {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return `${seconds} seconds ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  return (
    <div className="border-2 border-gray-200 p-4 hover:border-gray-400 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-gray-400">#{index + 1}</span>
            <h3 className="text-lg font-bold">
              {comparison.product1} vs {comparison.product2}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <span>📁</span>
              {comparison.category}
            </span>
            <span className="flex items-center gap-1">
              <span>🌐</span>
              {comparison.language.toUpperCase()}
            </span>
            <span className="flex items-center gap-1">
              <span>⏰</span>
              {timeAgo(comparison.created_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onPreview(comparison)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 font-semibold text-sm transition-colors"
        >
          👁️ Preview
        </button>
        <button
          onClick={() => onApprove(comparison.id)}
          className="px-4 py-2 bg-green-50 hover:bg-green-100 border-2 border-green-300 text-green-700 font-semibold text-sm transition-colors"
        >
          ✅ Approve
        </button>
        <button
          onClick={() => onReject(comparison)}
          className="px-4 py-2 bg-red-50 hover:bg-red-100 border-2 border-red-300 text-red-700 font-semibold text-sm transition-colors"
        >
          ❌ Reject
        </button>
      </div>
    </div>
  )
}
