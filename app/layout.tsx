import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; // Import font coding yang keren
import "./globals.css";

// Setup font
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgungSukaAFK - Coming Soon",
  description: "#1 Programmer Cipocok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetbrains.className}>{children}</body>
    </html>
  );
}
