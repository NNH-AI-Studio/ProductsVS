"use client"

import React from "react"
import Link from "next/link"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[v0] Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "500px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: 700 }}>Something went wrong</h1>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.7 }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "0.875rem 1.5rem",
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Refresh Page
              </button>
              <Link
                href="/"
                style={{
                  padding: "0.875rem 1.5rem",
                  background: "transparent",
                  color: "#000",
                  border: "2px solid #000",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                Go Home
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details style={{ marginTop: "2rem", textAlign: "left" }}>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>Error Details</summary>
                <pre
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#f5f5f5",
                    borderRadius: "4px",
                    overflow: "auto",
                    fontSize: "0.875rem",
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
