import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const SITE_URL = "https://tpiolalocal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TpiolaLocal | Demonstração de painel operacional",
  description:
    "Ambiente de demonstração para explorar fluxo de leads, indicadores e rotinas de negócios locais.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
