import type { Metadata } from "next";
import { Inter, Merriweather, Crimson_Pro } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VNExpress - Báo tiếng Việt nhiều người xem nhất",
  description: "VNExpress Clone - Cập nhật tin tức mới nhất 24h, đọc báo online về thời sự, kinh doanh, thể thao, giải trí...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${merriweather.variable} ${crimsonPro.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
