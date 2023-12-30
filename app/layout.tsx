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
import { ToastContainer } from "react-toastify";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Golden Path ",
  description: "Golden Path Website ",
  icons: {
    icon: "/assets/faviconG.png",
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
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-QQDYKB1HDQ" />

          <Script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-QQDYKB1HDQ');`,
            }}
          />

          <Script strategy="lazyOnload">
            {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3809406,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
          </Script>

          <ToastContainer theme="colored" />
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
