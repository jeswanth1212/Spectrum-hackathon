import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Megrim } from 'next/font/google';
import "./globals.css";

const megrimFont = Megrim({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-megrim',
});

export const metadata: Metadata = {
  title: "Spectrum Hackathon - Innovation Meets Collaboration",
  description: "Join the ultimate coding competition where innovation meets collaboration. Build, learn, and connect with the brightest minds in tech.",
  keywords: "hackathon, coding competition, tech event, programming, developers, innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${megrimFont.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
