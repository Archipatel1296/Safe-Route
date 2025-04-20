import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleMapsProvider } from "@/components/providers/GoogleMapsProvider";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fortis - Your Personal Safety Companion",
  description: "Navigate confidently with Fortis - Your intelligent safety companion that helps you make informed decisions about where and when to travel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleMapsProvider>
            <Header />
            <main className="pt-20">
              {children}
            </main>
          </GoogleMapsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}