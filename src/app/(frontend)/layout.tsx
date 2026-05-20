import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/styles/globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "eStar Global - Impacting Thailand",
  description: "A church in every village. A disciple in every home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.variable}>
      <head>
        {/* jsPDF and html-to-image for high-quality PDF generation with modern CSS support */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" 
          strategy="beforeInteractive"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js" 
          strategy="beforeInteractive"
        />
      </head>
      <body
        className="antialiased bg-black text-white font-sans"
      >
        <ReactQueryProvider>
          <Header />
          <main className="min-h-screen overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
