import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; // Import font coding yang keren
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Setup font
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgungSukaAFK — Portfolio",
  description: "#1 Programmer Cipocok. Projects, articles, and tutorials.",
};

// Runs before hydration so the theme class is correct on first paint —
// prevents a flash of the wrong theme. Default is dark when unset.
const NO_FLASH_SCRIPT = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    var isDark = theme ? theme === "dark" : true;
    var root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body className={`${jetbrains.className} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
