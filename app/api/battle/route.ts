import { NextResponse } from "next/server"
import { generateComparison } from "@/lib/groq"

export async function POST(request: Request) {
  try {
    const { productA, productB } = await request.json()

    if (!productA || !productB) {
      return NextResponse.json({ error: "Both products are required" }, { status: 400 })
    }

    const comparison = await generateComparison(productA.trim(), productB.trim())

    // Transform AI response to match frontend expectations
    const response = {
      productA: comparison.product1.name,
      productB: comparison.product2.name,
      summary: comparison.summary,
      strengthsA: comparison.pros_cons.product1.pros,
      weaknessesA: comparison.pros_cons.product1.cons,
      strengthsB: comparison.pros_cons.product2.pros,
      weaknessesB: comparison.pros_cons.product2.cons,
      recommendation: comparison.verdict.overall,
      // Include full comparison data for advanced features
      fullComparison: comparison,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Error in battle API:", error)

    // Provide user-friendly error messages
    const errorMessage = error instanceof Error ? error.message : "Failed to generate comparison"

    return NextResponse.json(
      {
        error: errorMessage,
        fallback: "Our AI service is temporarily unavailable. Please try again in a moment.",
      },
      { status: 500 },
    )
  }
}
