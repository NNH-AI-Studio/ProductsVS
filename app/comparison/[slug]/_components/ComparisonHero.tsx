interface ComparisonHeroProps {
  title: string
  description: string
  category: string
  viewCount: number
  lastUpdated: string
  optionA: { name: string }
  optionB: { name: string }
}

export default function ComparisonHero({
  title,
  description,
  category,
  viewCount,
  lastUpdated,
  optionA,
  optionB,
}: ComparisonHeroProps) {
  return (
    <section
      className="hero-section"
      style={{
        padding: "80px 0",
        textAlign: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.2 }}>{title}</h1>
          <p style={{ fontSize: "1.3rem", opacity: 0.95, marginBottom: "2rem", lineHeight: 1.6 }}>{description}</p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            <span
              style={{
                padding: "0.75rem 1.5rem",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50px",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              {category}
            </span>
            <span
              style={{
                padding: "0.75rem 1.5rem",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50px",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 600,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {viewCount.toLocaleString()} views
            </span>
            <span
              style={{
                padding: "0.75rem 1.5rem",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50px",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
