import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import SkipToContent from "@/components/SkipToContent"
import StructuredData from "@/components/seo/StructuredData"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeScript } from "@/components/ThemeScript"
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo/structured-data"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Products VS - Compare Everything | Smart Comparisons in English & Arabic",
    template: "%s | Products VS",
  },
  description:
    "Compare products, services, and lifestyle choices with Products VS. 70+ detailed comparisons in English and Arabic. Make informed decisions faster!",
  keywords: ["product comparison", "reviews", "vs", "compare products", "bilingual comparisons"],
  authors: [{ name: "Products VS" }],
  creator: "Products VS",
  publisher: "Products VS",
  metadataBase: new URL("https://www.productsvs.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    title: "Products VS - Compare Everything | Smart Comparisons",
    description:
      "Compare products, services, and lifestyle choices. 70+ detailed comparisons in English and Arabic. Make informed decisions!",
    url: "https://www.productsvs.com",
    siteName: "Products VS",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Products VS - Smart Product Comparisons",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products VS - Compare Everything",
    description: "70+ detailed comparisons in English and Arabic. Make informed decisions faster!",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

const organizationSchema = generateOrganizationSchema({
  name: "Products VS",
  url: "https://www.productsvs.com",
  logo: "https://www.productsvs.com/images/logo.png",
  description:
    "Professional comparison platform providing detailed product and service comparisons in English and Arabic to help users make informed decisions.",
  email: "info@productsvs.com",
  foundingDate: "2025",
  sameAs: [
    "https://www.facebook.com/productsvs",
    "https://twitter.com/productsvs",
    "https://www.linkedin.com/company/productsvs",
  ],
  contactPoint: {
    contactType: "Customer Service",
    email: "info@productsvs.com",
    availableLanguage: ["English", "Arabic"],
    areaServed: "Worldwide",
  },
})

const websiteSchema = generateWebsiteSchema({
  url: "https://www.productsvs.com",
  name: "Products VS",
  description: "Compare products, services, and lifestyle choices with detailed analysis in English and Arabic.",
  inLanguage: ["en", "ar"],
  potentialAction: {
    type: "SearchAction",
    target: "https://www.productsvs.com/search?q={search_term_string}",
    queryInput: "required name=search_term_string",
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-XXXXXXXXXXXXXXXX"}`}
          crossOrigin="anonymous"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-XXXXXXXXXXXXXXXX"}",
                enable_page_level_ads: true,
                overlays: {bottom: true}
              });
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <StructuredData data={[organizationSchema, websiteSchema]} />
          <SkipToContent />
          <ErrorBoundary>{children}</ErrorBoundary>
          <Analytics />
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
