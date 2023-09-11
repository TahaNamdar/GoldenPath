import "../dist/output.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TrpcProvider } from "@/utils/trpc-provider";
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "@/utils/themeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Golden App",
  description: "T3 stack app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <TrpcProvider>
            <SessionProvider session={session}>{children}</SessionProvider>
          </TrpcProvider>
        </Providers>
      </body>
    </html>
  );
}
