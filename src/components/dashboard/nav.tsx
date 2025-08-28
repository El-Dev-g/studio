"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { CreditCard, Globe, LayoutDashboard, LifeBuoy, Settings as SettingsIcon, Folder, Mail, Lock, BookOpen, Shield, AppWindow } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/apps", icon: AppWindow, label: "App Marketplace" },
  { href: "/dashboard/domains", icon: Globe, label: "Domains" },
  { href: "/dashboard/files", icon: Folder, label: "File Management" },
  { href: "/dashboard/email", icon: Mail, label: "Email Management" },
  { href: "/dashboard/security", icon: Shield, label: "Security" },
  { href: "/dashboard/ssl", icon: Lock, label: "SSL Management" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/support", icon: LifeBuoy, label: "Support" },
  { href: "/dashboard/settings", icon: SettingsIcon, label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
        return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={isActive} className="w-full justify-start">
            <Link href={item.href} onClick={handleLinkClick}>
              <item.icon className="h-4 w-4 mr-2" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )})}
    </SidebarMenu>
  );
}
