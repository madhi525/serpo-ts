"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import logoKdk from "../app/logo-banner-1.png"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./ui/button"

interface MenuItem {
  title: string
  url: string
}

interface MenuGroup {
  title: string
  url: string
  items: MenuItem[]
}

interface MenuData {
  adminMenu: MenuGroup[]
  serpoMenu: MenuGroup[]
}

export function AppSidebar({ onActiveItemChange, ...props }: { onActiveItemChange?: (item: string) => void }) {
  const router = useRouter()
  const [isActiveValue, setIsActiveValue] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

  const clearSession = useCallback(() => {
    // Clear local storage
    localStorage.removeItem("role")
    // Clear the HttpOnly cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict"
  }, [])

  const handleLogout = useCallback(() => {
    clearSession()
    // Redirect to the login page
    router.push("/")
  }, [router, clearSession])

  useEffect(() => {
    let timer: NodeJS.Timeout

    const handleActivity = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        handleLogout() // Call handleLogout after 30 minutes of inactivity
      }, 1800000) // 30 minutes in milliseconds
    }

    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
    }
  }, [handleLogout])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role")
      setRole(storedRole ? JSON.parse(storedRole) : null)
    }
  }, [])

  const handleClick = (item: string) => {
    if (!item) return // Ensure item is not null
    setIsActiveValue(item)
    if (onActiveItemChange) {
      onActiveItemChange(item)
    }
  }

  const dataMenu: MenuData = {
    adminMenu: [
      {
        title: "Dashboard",
        url: "#",
        items: [
          { title: "Home", url: `/dashboard/${role}` },
          { title: "MTTR", url: "/mttr" },
        ],
      },
      {
        title: "Laporan",
        url: "#",
        items: [
          { title: "PM Link", url: "/dashboard/menu/pmlink" },
          { title: "PM POP", url: "/PM" },
          { title: "BOQ", url: "/boq" },
        ],
      },
    ],
    serpoMenu: [
      {
        title: "Dashboard",
        url: "#",
        items: [
          { title: "Home", url: `/dashboard/${role}` },
          { title: "MTTR", url: "/mttr/serpo" },
        ],
      },
      {
        title: "Laporan",
        url: "#",
        items: [
          { title: "PM POP", url: "/pm/pmpop" },
          { title: "PM Link", url: "/dashboard/menu/pmlink" },
          { title: "BOQ", url: "/boq/serpo" },
          { title: "Raker", url: "/raker" },
        ],
      },
    ],
  }

  const renderMenu = (menuData: MenuGroup[]) => (
    <>
      {menuData.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => handleClick(subItem.title)}
                    isActive={isActiveValue === subItem.title}
                    variant={isActiveValue === subItem.title ? "outline" : "default"}
                  >
                    <Link href={subItem.url}>{subItem.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )

  const menuKonten = role ? (role === "serpo" ? renderMenu(dataMenu.serpoMenu) : renderMenu(dataMenu.adminMenu)) : null

  return (
    <Sidebar {...props}>
      <SidebarHeader className="shadow-sm">
        <div className="w-full h-[48px] flex justify-center items-center">
          <Image
            className="dark:invert"
            src={logoKdk || "/placeholder.svg"}
            alt="kdk logo"
            width={180}
            height={38}
            priority
            style={{ width: "180px", height: "38px" }}
          />
        </div>
      </SidebarHeader>
      <SidebarContent id="menu-role-container">{menuKonten || <p>No menu available for this role.</p>}</SidebarContent>
      <div className="p-6 w-full">
        <Button variant={"destructive"} className="shadow-sm font-bold w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}

