
"use client"

import "../globals.css";
import { ModeToggle } from "@/components/ModeToggle";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
// import { SessionProvider } from "next-auth/react";

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
  const [activeItem, setActiveItem] = useState<string | "Home">("Home");
  const handleItemChange = (item:string) =>{
    setActiveItem(item);
    console.log("Active item in parent:", item);
  }
  return (
        <SidebarProvider>
          <AppSidebar onActiveItemChange={handleItemChange}/>
          <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between sticky top-0 w-full z-10 bg-inherit">
            <div className="flex flex-row items-center gap-2">
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
            <ModeToggle />
          </header>
          {children}
          </SidebarInset>
        </SidebarProvider>
  );
}
