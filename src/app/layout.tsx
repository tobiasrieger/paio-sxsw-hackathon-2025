import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <div className="flex min-h-screen">
          <aside className="w-64 border-r border-gray-200 bg-white">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold tracking-tight italic">PAIO</h1>
              <p className="text-sm text-gray-600 tracking-tight mt-1">
                (Physical) AI Monitoring and Ops
              </p>
            </div>
            <nav className="p-4">
              <a
                href="/why-robotics"
                className="block px-4 py-2 rounded hover:bg-gray-50 transition-colors tracking-tight"
              >
                Why robotics?
              </a>
              <a
                href="/guardian-dashboard"
                className="block px-4 py-2 rounded hover:bg-gray-50 transition-colors tracking-tight"
              >
                Guardian Dashboard
              </a>
            </nav>
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
      </body>
    </html>
  );
}
