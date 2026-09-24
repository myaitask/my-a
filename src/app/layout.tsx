import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";


export const metadata: Metadata = {
  title: "My AI Task | Social Media Automation & Social CRM",
  description: "Enterprise Instagram Comment-to-DM, WhatsApp Marketing, and Unified Social CRM for Agencies & Creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
      </head>
      <body className="antialiased bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
