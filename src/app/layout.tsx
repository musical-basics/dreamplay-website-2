import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { ABTracker } from "@/components/features/analytics/ABTracker";
import { EmailTracker } from "@/components/EmailTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamplaypianos.com'),
  title: {
    template: '%s | DreamPlay Pianos',
    default: 'DreamPlay One | The Best Piano for Small Hands',
  },
  description: 'Discover the DreamPlay One, a premium digital piano with narrow keys designed specifically for small hands, children, and preventing hand injury.',
  openGraph: {
    title: 'DreamPlay Pianos | The Piano for Small Hands',
    description: 'A premium digital piano featuring ergonomically narrower keys designed to eliminate strain, prevent injury, and let you play freely.',
    url: 'https://dreamplaypianos.com',
    siteName: 'DreamPlay Pianos',
    images: [{ url: '/images/marketing/dreamplay-one-hero.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: "/images/logos/favicon.png",
    apple: "/images/logos/webclip.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-wf-site="68b99847f96fcca15429faec" suppressHydrationWarning>
      <head>
        {/* Fonts preconnect */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
      </head>
      <body>
        <AnalyticsTracker />
        <ABTracker />
        <EmailTracker />
        {children}
      </body>
    </html>
  );
}
