import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Abayasabaya | Premium Abaya Boutique",
    template: "%s | Abayasabaya",
  },
  description:
    "Discover exquisite handcrafted abayas from Qatar. Premium fabrics, timeless designs, and unparalleled craftsmanship for the modern woman.",
  keywords: [
    "abaya",
    "modest fashion",
    "luxury abaya",
    "Qatar",
    "GCC fashion",
    "premium modest wear",
  ],
  openGraph: {
    title: "Abayasabaya | Premium Abaya Boutique",
    description:
      "Discover exquisite handcrafted abayas from Qatar. Premium fabrics, timeless designs, and unparalleled craftsmanship.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-cream text-deep-black">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

