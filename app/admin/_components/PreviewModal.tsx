"use client"

interface Comparison {
  id: string
  product1: string
  product2: string
  category: string
  language: string
  content: any
}

interface PreviewModalProps {
  comparison: Comparison
  onClose: () => void
}

export default function PreviewModal({ comparison, onClose }: PreviewModalProps) {
  const content = comparison.content

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-300">
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {comparison.product1} vs {comparison.product2}
          </h2>
          <button onClick={onClose} className="text-3xl hover:text-gray-600 transition-colors">
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Summary */}
          {content?.summary && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Summary</h3>
              <p className="text-gray-700 leading-relaxed">{content.summary}</p>
            </div>
          )}

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-green-700">✓ {comparison.product1} Strengths</h3>
              <ul className="space-y-2">
                {content?.product1Pros?.map((pro: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-green-700">✓ {comparison.product2} Strengths</h3>
              <ul className="space-y-2">
                {content?.product2Pros?.map((pro: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict */}
          {content?.verdict && (
            <div className="bg-gray-50 border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-3">Final Verdict</h3>
              <p className="text-gray-700 leading-relaxed">{content.verdict}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
