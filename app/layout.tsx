import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "~/components/app-sidebar"
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
            <main>
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