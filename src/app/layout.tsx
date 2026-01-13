import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: {
    default: "Recepti",
    template: "%s | Recepti",
  },
  description: "Pronađi savršen recept za svaku prigodu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/recepti"
                className="text-2xl font-bold text-orange-600"
              >
                Recepti
              </Link>
              <nav>
                <Link
                  href="/recepti"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Svi recepti
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-8">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-500 text-sm">
              © 2026 Recepti. Zadatak za Enterwell.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
