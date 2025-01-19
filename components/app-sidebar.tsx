'use client'
import { Home, LineChart } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { ThemeToggle } from "./ThemeToggle"
import Image from 'next/image'

import LogoLight from "~/public/logo-horizontal-light.png"
import LogoDark from "~/public/logo-horizontal-dark.png"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { MdEventNote } from "react-icons/md"
import { TbHelmet } from "react-icons/tb"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home
  },
  {
    title: "Drivers",
    url: "/drivers/search",
    urlMatch: "/drivers",
    icon: TbHelmet
  },{
    title: 'Series',
    url: '/series',
    icon: MdEventNote
  }
]
  
  export function AppSidebar() {
    const { resolvedTheme } = useTheme();
    const pathName = usePathname();

    return (
      <Sidebar variant="floating">
      <SidebarHeader>
        <div>
          {resolvedTheme === "dark" ? (
            <Image src={LogoDark} width={200} height={50} alt="Logo"/>
          ) : (<Image src={LogoLight} width={200} height={50} alt="Logo"/>)}
          
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathName === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarGroup>
                <SidebarGroupLabel>
                  <p className="font-extralight text-md">Analytics</p>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathName === '/irating'}>
                      
                      <a href="/irating">
                        <LineChart />
                        iRating
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
    )
  }
  