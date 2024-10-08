import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Root from "./root";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "300", "500", "600", "700", "100", "200"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Root> {children} </Root>
      </body>
    </html>
  );
}
