
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, ShieldCheck, Server, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notifications = [
    {
        icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
        title: "New Invoice",
        description: "Invoice #INV-1235 for $57.00 has been paid.",
        time: "15m ago"
    },
    {
        icon: <Server className="h-4 w-4 text-muted-foreground" />,
        title: "Server Update",
        description: "Your server has been updated to the latest version.",
        time: "1h ago"
    },
    {
        icon: <ShieldCheck className="h-4 w-4 text-muted-foreground" />,
        title: "Security Scan",
        description: "Malware scan completed. No threats found.",
        time: "3h ago"
    }
]

export function NotificationsNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Bell className="h-5 w-5" />
            <Badge className="absolute top-0 right-0 h-4 w-4 justify-center p-0">{notifications.length}</Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs leading-none text-muted-foreground">Mark all as read</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="overflow-auto max-h-80">
            {notifications.map((notification, index) => (
                <DropdownMenuItem key={index} className="flex items-start gap-3">
                    <div className="pt-1">{notification.icon}</div>
                    <div className="flex-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</p>
                </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
            View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
