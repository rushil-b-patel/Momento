import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import "./globals.css";
import PageWrapper from "@/components/layout/PageWrapper";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Pixel - World through Rushil’s Lens",
  description: "A calm, cinematic photo gallery by Rushil Patel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(140,140,255,0.12),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(100,100,255,0.1),transparent_70%)]" />
        </div>

        <AuthProvider>
          <Header />
          <PageWrapper>{children}</PageWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
