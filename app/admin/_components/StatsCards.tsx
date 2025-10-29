interface Stats {
  totalComparisons: number
  pendingReviews: number
  approvedToday: number
  rejectedToday: number
}

interface StatsCardsProps {
  stats: Stats | null
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Pending Reviews",
      value: stats?.pendingReviews ?? 0,
      icon: "⏳",
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      label: "Total Comparisons",
      value: stats?.totalComparisons ?? 0,
      icon: "⚖️",
      color: "bg-blue-50 border-blue-200",
    },
    {
      label: "Approved Today",
      value: stats?.approvedToday ?? 0,
      icon: "✅",
      color: "bg-green-50 border-green-200",
    },
    {
      label: "Rejected Today",
      value: stats?.rejectedToday ?? 0,
      icon: "❌",
      color: "bg-red-50 border-red-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.label} className={`p-6 bg-white border-2 ${card.color} transition-transform hover:scale-105`}>
          <div className="text-4xl mb-3">{card.icon}</div>
          <div className="text-3xl font-extrabold mb-2">{card.value}</div>
          <div className="text-sm font-medium text-gray-600">{card.label}</div>
        </div>
      ))}
    </div>
  )
}
