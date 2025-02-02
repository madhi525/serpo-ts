"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import logoKdk from "../app/logo-banner-1.png";
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarRail, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

export function AppSidebar({ onActiveItemChange, ...props }) {
  const router = useRouter();
  const [isActiveValue, setIsActiveValue] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole ? JSON.parse(storedRole) : null);
    }
  }, []);

  const handleClick = (item: string) => {
    setIsActiveValue(item);
    if (onActiveItemChange) {
      onActiveItemChange(item);
    }
  };

  const dataMenu = {
    adminMenu: [
      {
        title: "dashboard",
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
          { title: "PM Link", url: "/PM" },
          { title: "PM POP", url: "/PM" },
          { title: "BOQ", url: "/boq" },
        ],
      },
    ],
    serpoMenu: [
      {
        title: "dashboard",
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
          { title: "PM Link", url: "/pm/pmlink" },
          { title: "BOQ", url: "/boq/serpo" },
          { title: "Raker", url: "/raker" },
        ],
      },
    ],
  };


  const renderMenu = (menuData) => (
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
  );

  const menuKonten = role === "serpo" ? renderMenu(dataMenu.serpoMenu) : renderMenu(dataMenu.adminMenu);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="shadow-sm">
        <div className="w-full h-[48px] flex justify-center items-center">
          <Image
            className="dark:invert"
            src={logoKdk}
            alt="kdk logo"
            width={180}
            height={38}
            priority
            style={{ width: "180px", height: "38px" }}
          />
        </div>
      </SidebarHeader>
      <SidebarContent id="menu-role-container">
        {menuKonten || <p>No menu available for this role.</p>}
      </SidebarContent>
      <div className="p-6 w-full">
        <Button 
                variant={'destructive'}
                className="shadow-sm font-bold w-full"
                onClick={handleLogout}>
                Logout
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
