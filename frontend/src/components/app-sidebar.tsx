"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logoKdk from '../app/logo-banner-1.png';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarRail, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';

const dataMenu = {
  adminMenu: [
    {
      title: 'dashboard',
      url: '#',
      items: [
        { title: 'Home', url: '/dashboard' },
        { title: 'MTTR', url: '/mttr' },
      ]
    },
    {
      title: 'Laporan',
      url: '#',
      items: [
        { title: 'PM Link', url: '/PM' },
        { title: 'PM POP', url: '/PM' },
        { title: 'BOQ', url: '/boq' }
      ]
    }
  ],
  serpoMenu: [
    {
      title: 'dashboard',
      url: '#',
      items: [
        { title: 'Home', url: '/dashboard' },
        { title: 'MTTR', url: '/mttr/serpo' },
      ]
    },
    {
      title: 'Laporan',
      url: '#',
      items: [
        { title: 'PM POP', url: '/pm/pmpop' },
        { title: 'PM Link', url: '/pm/pmlink' },
        { title: 'BOQ', url: '/boq/serpo' },
        { title: 'Raker', url: '/raker' }
      ]
    }
  ]
};

export function AppSidebar({ onActiveItemChange, ...props }: React.ComponentProps<typeof Sidebar> & { onActiveItemChange?: (item: string | null) => void }) {
  const router = useRouter();
  const [isActiveValue, setIsActiveValue] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleClick = (item: string) => {
    setIsActiveValue(item);
    if (onActiveItemChange) {
      onActiveItemChange(item);
    }
  };

  // Fungsi untuk merender menu berdasarkan role
  const renderMenu = (menuData: typeof dataMenu.adminMenu) => (
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
                    <a href={subItem.url}>{subItem.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );

  // Menentukan menu berdasarkan role
  const menuKonten = role === 'serpo' ? renderMenu(dataMenu.serpoMenu) : renderMenu(dataMenu.adminMenu);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
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
            style={{ width: '180px', height: '38px' }}
            onClick={handleLogout}
          />
        </div>
      </SidebarHeader>
      <SidebarContent id="menu-role-container">
        {menuKonten || <p>No menu available for this role.</p>}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
