

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Server, CreditCard, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, User</h1>
          <p className="text-muted-foreground">Here's a quick overview of your account.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Services</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Cloud Hosting</div>
            <p className="text-xs text-muted-foreground">
              Addons: DDoS Protection, Daily Backups, Premium SSL, Pro Email
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Domains</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Domain</div>
            <p className="text-xs text-muted-foreground">mydomain.com</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billing</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$57.00</div>
            <p className="text-xs text-muted-foreground">Next invoice on August 20</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>An overview of recent events on your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div className="p-2 bg-secondary rounded-full"><Globe className="h-4 w-4 text-muted-foreground" /></div>
              <p className="text-sm">Domain <span className="font-semibold">mydomain.com</span> was successfully connected.</p>
              <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
            </li>
             <li className="flex items-center gap-4">
              <div className="p-2 bg-secondary rounded-full"><ShieldCheck className="h-4 w-4 text-muted-foreground" /></div>
              <p className="text-sm">Addons were purchased for your hosting plan.</p>
              <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="p-2 bg-secondary rounded-full"><CreditCard className="h-4 w-4 text-muted-foreground" /></div>
              <p className="text-sm">Invoice <span className="font-semibold">#INV-001</span> for $57.00 was paid.</p>
              <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
            </li>
             <li className="flex items-center gap-4">
              <div className="p-2 bg-secondary rounded-full"><Server className="h-4 w-4 text-muted-foreground" /></div>
              <p className="text-sm">New hosting service created.</p>
              <span className="ml-auto text-xs text-muted-foreground">3 days ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
