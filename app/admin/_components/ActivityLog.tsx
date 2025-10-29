"use client"

import { useState } from "react"

interface Activity {
  id: string
  action: string
  details: string
  timestamp: string
}

export default function ActivityLog() {
  const [activities] = useState<Activity[]>([
    {
      id: "1",
      action: "Comparison Approved",
      details: "iPhone 15 vs Samsung S24",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      action: "Comparison Rejected",
      details: "Product A vs Product B - Low quality content",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      action: "New Submission",
      details: "MacBook vs Dell XPS",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="bg-white border-2 border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>📋</span>
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex justify-between items-start p-4 bg-gray-50 border border-gray-200">
            <div>
              <div className="font-semibold mb-1">{activity.action}</div>
              <div className="text-sm text-gray-600">{activity.details}</div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap ml-4">{timeAgo(activity.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
