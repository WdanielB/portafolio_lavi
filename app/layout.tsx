import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { PerformanceProvider } from "@/lib/usePerformanceStore";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: "LAVI Agency | Digital Craftsmanship",
  description: "Desarrollo web High-End y Experiencias Digitales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${jetbrains.variable} ${playfair.variable} antialiased grain`}
      >
        <PerformanceProvider>{children}</PerformanceProvider>
      </body>
    </html>
  );
}
