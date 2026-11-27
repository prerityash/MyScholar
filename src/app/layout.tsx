import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MyScholar – Scholarship Verification Portal",
  description:
    "Analyze scholarship listings for scam patterns including misleading domains, payment demands, fake organizations, copied content, and suspicious language.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('myscholar_theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
