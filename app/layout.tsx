import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop"; // <--- Import here
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sijgeria Umesh Chandra Smriti Sangha",
  description: "Official website of Sijgeria Umesh Chandra Smriti Sangha Club",
  openGraph: {
    title: "Sijgeria UCSS - Community & Culture",
    description: "Join us in celebrating culture, sports, and humanity.",
  },
  manifest: '/manifest.json',
  themeColor: '#0f0f0f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <NextTopLoader
          color="#fbbf24" // Your accent color
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #fbbf24,0 0 5px #fbbf24"
        />
        <Navbar />

        {children}

        <Footer />
        <ScrollToTop />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
