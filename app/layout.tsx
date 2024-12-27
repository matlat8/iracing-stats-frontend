import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "~/components/app-sidebar"
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
import { Montserrat } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"

const montserrat = Montserrat({ subsets: ['latin']})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <Analytics />
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>iRacing Stat</title>
        </head>
        <body>
        <ThemeProvider attribute="class" disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
            <main
              className=" bg-gray-100 dark:bg-black text-black dark:text-white w-full"
              style={montserrat.style}>
                <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  )
}