import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["400", "700"], // Importando pesos necessários
  variable: "--font-rajdhani" 
});

export const metadata: Metadata = {
  title: "Prompt Enhancer",
  description: "Aprimore seus prompts com IA para obter resultados de alta qualidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}