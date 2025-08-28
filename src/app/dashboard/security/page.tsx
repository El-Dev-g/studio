
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ShieldCheck, Server } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground">An overview of your website's security status.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <div>
              <CardTitle>DDoS Protection</CardTitle>
              <CardDescription>Your websites are protected against network attacks.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                    <p className="font-semibold">Status: Active</p>
                    <p className="text-sm text-muted-foreground">Powered by Cloudflare</p>
                </div>
                <Button variant="outline" disabled>View Analytics</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Shield className="h-10 w-10 text-primary" />
            <div>
              <CardTitle>Malware Scanning</CardTitle>
              <CardDescription>We regularly scan your files for malicious code.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                    <p className="font-semibold">Status: Enabled</p>
                    <p className="text-sm text-muted-foreground">Last scan: 2 hours ago</p>
                </div>
                <Button variant="outline" disabled>Start Scan</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <div>
              <CardTitle>Free Let's Encrypt SSL</CardTitle>
              <CardDescription>All our plans come with free, automatic SSL certificates.</CardDescription>
            </div>
          </CardHeader>
           <CardContent>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                    <p className="font-semibold">Status: Active</p>
                    <p className="text-sm text-muted-foreground">We'll automatically renew your certificates.</p>
                </div>
                <Button variant="outline" disabled>Manage</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Server className="h-10 w-10 text-primary" />
            <div>
              <CardTitle>Isolated Environments</CardTitle>
              <CardDescription>Your hosting environment is secured and isolated.</CardDescription>
            </div>
          </CardHeader>
           <CardContent>
             <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                    <p className="font-semibold">Technology: Docker</p>
                    <p className="text-sm text-muted-foreground">Ensuring resource and security isolation.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
