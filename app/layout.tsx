import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "~/components/app-sidebar"
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
import { Montserrat } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { TooltipProvider } from "~/components/ui/tooltip";
import { Suspense } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

const montserrat = Montserrat({ subsets: ['latin']})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <Analytics />
      <html lang="en" suppressHydrationWarning>
        <Script async defer
          src={process.env.NEXT_PUBLIC_UMAMI_SRC}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          data-domains="iracingstat.com"
          />
        <body>

        <ThemeProvider attribute="class" disableTransitionOnChange>
          <TooltipProvider>
            <Suspense>
              <SidebarProvider>
                <AppSidebar />
                <main
                className=" bg-gray-100 dark:bg-black text-black dark:text-white w-full"
                style={montserrat.style}>
                  <SidebarTrigger />
                  {children}
                  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''}/>
                </main>
              </SidebarProvider>
            </Suspense>
          </TooltipProvider>
        </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  )
}