import type { Metadata } from "next";
import { Inter, Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import Preloader from "@/components/layout/Preloader";
import { VideoModalProvider } from "@/components/layout/VideoModal";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-sans-next",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display-next",
  subsets: ["latin"],
  weight: "400",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif-next",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ARC Films — Visual Storytelling Studio",
  description: "ARC Films is a premium visual storytelling studio crafting cinematic experiences through film, motion design, brand identity, and 3D animation.",
  keywords: ["ARC Films", "film production", "video editing", "motion graphics", "brand identity", "cinematography", "storytelling studio"],
  openGraph: {
    title: "ARC Films — Visual Storytelling Studio",
    description: "We don't just make films. We architect moments that live forever.",
    type: "website",
  },
  icons: {
    icon: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427727/favicon_rhu5o4.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${cormorantGaramond.variable}`}>
      <body>
        <VideoModalProvider>
          <Preloader />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </VideoModalProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
