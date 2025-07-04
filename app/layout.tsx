import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
// @ts-expect-error
import NavBar from '../components/navBar.tsx';//

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{variables :{colorPrimary:"#fe5933"}}}>
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
