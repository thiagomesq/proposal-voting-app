import type { Metadata } from "next";
import Providers  from "@/providers";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Votação de Propostas",
  description: "Uma plataforma para criar e votar em propostas usando blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen max-w-7xl mx-auto pt-10 px-6 md:px-8 lg:px-10 xl:px-0 overflow-hidden">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
