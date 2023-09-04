import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TrpcProvider } from "@/utils/trpc-provider";
import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Golden App",
  description: "T3 stack app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>
          <Providers>{children}</Providers>
        </TrpcProvider>
      </body>
    </html>
  );
}
