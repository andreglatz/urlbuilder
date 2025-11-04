import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PostgreSQL URL Builder - Generate Database Connection Strings",
  description:
    "Generate PostgreSQL connection strings easily. Build database URLs with host, port, user, password, and database name. All data stays in your browser.",
  keywords: [
    "PostgreSQL",
    "connection string",
    "database URL",
    "postgres URL builder",
    "connection string generator",
    "database connection",
    "postgres",
    "postgresql URL",
    "database configuration",
    "connection URL",
  ],
  authors: [{ name: "PostgreSQL URL Builder" }],
  creator: "PostgreSQL URL Builder",
  publisher: "PostgreSQL URL Builder",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "PostgreSQL URL Builder - Generate Database Connection Strings",
    description:
      "Generate PostgreSQL connection strings easily. Build database URLs with host, port, user, password, and database name. All data stays in your browser.",
    siteName: "PostgreSQL URL Builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "PostgreSQL URL Builder - Generate Database Connection Strings",
    description:
      "Generate PostgreSQL connection strings easily. Build database URLs with host, port, user, password, and database name. All data stays in your browser.",
    creator: "@urlbuilder",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
