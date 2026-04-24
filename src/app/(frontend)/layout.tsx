import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import "@/styles/globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
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
    <html lang="en" className={gothicA1.variable}>
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
