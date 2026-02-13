import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

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
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
