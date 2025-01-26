
"use client"

// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useState } from "react"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleItemChange = (item:string | null) =>{
    setActiveItem(item);
    console.log("Active item in parent:", item);
  }
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
        <SidebarProvider>
          <AppSidebar onActiveItemChange={handleItemChange}/>
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
              <div className="flex flex-row items-center gap-2 ">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        {activeItem}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <Button 
                variant={'destructive'}
                className="shadow-sm font-bold"
                onClick={handleLogout}>
                Logout
              </Button>
            </header>
          {children}
          </SidebarInset>
        </SidebarProvider>
  );
}
