import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NeuralBackground from "@/components/NeuralBackground";
import AIChatbot from "@/components/AIChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryan Saini | AI & ML Engineer | Full Stack Developer Portfolio",
  description:
    "Explore the portfolio of Aryan Saini - a Computer Science student at Quantum University specializing in deep learning architectures, Computer Vision, and Next.js systems.",
  keywords: [
    "Aryan Saini",
    "AI Engineer Portfolio",
    "Machine Learning Developer",
    "Computer Vision Student",
    "Next.js Developer Portfolio",
    "Deepfake Detection TensorFlow",
    "React 19 Next.js 16 Portfolio",
  ],
  authors: [{ name: "Aryan Saini" }],
  openGraph: {
    title: "Aryan Saini | AI & ML Engineer Portfolio",
    description:
      "Showcasing high-precision Deepfake Detection models, content recommendation algorithms, and performant Next.js platforms.",
    url: "https://aryansaini.dev", // Mock domain, easily customizable
    siteName: "Aryan Saini Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Saini | AI & ML Engineer Portfolio",
    description:
      "Deep Learning models and Full Stack engineering solutions built with TensorFlow, Python, and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-black text-white relative font-sans">
        {/* Particle Canvas background */}
        <NeuralBackground />

        {/* Core page contents */}
        {children}

        {/* Floating AI dialogue chat */}
        <AIChatbot />
      </body>
    </html>
  );
}