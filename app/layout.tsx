import type { Metadata } from "next";
import "./globals.css";
import Root from "./root";



export const metadata: Metadata = {
  title: "Akya Butik",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Root> {children} </Root>
      </body>
    </html>
  );
}
