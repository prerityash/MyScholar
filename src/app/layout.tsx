import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ScholarShield – Scholarship Verification Portal",
  description:
    "Analyze scholarship listings for scam patterns including misleading domains, payment demands, fake organizations, copied content, and suspicious language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
