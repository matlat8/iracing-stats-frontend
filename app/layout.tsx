import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "~/components/app-sidebar"
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin']})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
            <main
              className="h-screen overflow-hidden bg-gray-100 text-black w-full"
              style={montserrat.style}>
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  )
}