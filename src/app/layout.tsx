import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ─────────────────────────────────────────────────────────
   SEO Metadata — UPDATE: name, description, OG image, URL
   ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Prathamesh Sutar — Cinematographer & Video Editor",
  description:
    "Award-winning cinematographer, video editor, and colorist crafting visual stories that move audiences globally. Available for commercial, documentary, and narrative projects.",
  keywords: [
    "cinematographer",
    "video editor",
    "colorist",
    "videographer",
    "film",
    "commercial",
    "documentary",
  ],
  authors: [{ name: "Prathamesh Sutar" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Prathamesh Sutar — Cinematographer & Video Editor",
    description: "Visual storytelling through light, motion, and precision.",
    type: "website",
    url: "https://prathamesh-editor-portfolio.vercel.app/", // ← UPDATE YOUR URL
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }], // ← UPDATE OG IMAGE
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Sutar — Cinematographer & Video Editor",
    description: "Visual storytelling through light, motion, and precision.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Bebas Neue (display), Inter (body), Space Mono (code/label) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
