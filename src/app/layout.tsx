import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { SafetyLogProvider } from "./contexts/SafetyLogContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAIO - Physical AI Monitoring & Ops Platform",
  description: "Comprehensive dashboard for monitoring and managing deployed physical AI robots with Guardian safety system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SafetyLogProvider>
          <div className="flex min-h-screen">
            <aside className="w-64 border-r border-gray-200 bg-white">
              <div className="px-6 pt-6 pb-3">
                <h1 className="text-2xl font-bold tracking-tight italic">PAIO</h1>
                <p className="text-sm text-gray-600 tracking-tight mt-1">
                  (Physical) AI Monitoring and Ops
                </p>
              </div>
              <Navigation />
            </aside>
            <main className="flex-1 bg-white relative">
              <div className="absolute top-6 right-8">
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">TR</span>
                </div>
              </div>
              {children}
            </main>
          </div>
        </SafetyLogProvider>
      </body>
    </html>
  );
}
