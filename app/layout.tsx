import "../dist/output.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { TrpcProvider } from "@/utils/trpc-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "./SessionProvider";
import localFont from "@next/font/local";
import { Providers } from "@/utils/globalRedux";
import ActionSizeProvider from "@/utils/actionSize";
 
export const metadata: Metadata = {
  title: "Golden Path ",
  description: "Golden Path Website ",
  icons: {
    icon: "/assets/logo.svg",
  },
};

const TOMMY = localFont({
  src: [
    {
      path: "../public/font/MADE TOMMY Thin_PERSONAL USE.otf",
      weight: "300",
    },
    {
      path: "../public/font/MADE TOMMY Regular_PERSONAL USE.otf",
      weight: "400",
    },
    {
      path: "../public/font/MADE TOMMY Medium_PERSONAL USE.otf",
      weight: "500",
    },
  ],
  variable: "--font-TOMMY",
});



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Providers>
          <body
            className={`${TOMMY.variable} font-sans`}
            suppressHydrationWarning={true}
          >
            <ActionSizeProvider>
              <TrpcProvider>
                <SessionProvider session={session}>{children}</SessionProvider>
              </TrpcProvider>
            </ActionSizeProvider>
          </body>
      </Providers>
    </html>
  );
}
