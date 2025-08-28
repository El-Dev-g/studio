
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ShieldCheck, Server, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const initialCertificates = [
    { domain: "mydomain.com", type: "Let's Encrypt", status: "Active", expires: "2024-10-12" },
    { domain: "another-site.dev", type: "Premium SSL", status: "Active", expires: "2025-01-01" },
    { domain: "portfolio.me", type: "Let's Encrypt", status: "Expired", expires: "2024-06-01" },
];

type Certificate = {
    domain: string;
    type: string;
    status: 'Active' | 'Expired' | 'Pending';
    expires: string;
};


export default function SecurityPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const { toast } = useToast();

  const handleInstallSsl = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const domain = formData.get("domain") as string;
    
    const newCert: Certificate = {
        domain,
        type: "Custom",
        status: "Active",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    };

    setCertificates([newCert, ...certificates]);
    toast({ title: "Success", description: `SSL certificate for ${domain} installed successfully.`});
  };

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

       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Installed SSL Certificates</CardTitle>
            <CardDescription>Manage your custom or premium SSL certificates.</CardDescription>
          </div>
          <Dialog>
              <DialogTrigger asChild>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> Install Custom SSL</Button>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Install Custom SSL Certificate</DialogTitle>
                      <DialogDescription>
                          Provide the domain and certificate details.
                      </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleInstallSsl}>
                      <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                              <Label htmlFor="domain">Domain</Label>
                              <Input id="domain" name="domain" required placeholder="example.com" />
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="certificate">Certificate (CRT)</Label>
                              <Textarea id="certificate" name="certificate" required rows={4} />
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="private-key">Private Key (KEY)</Label>
                              <Textarea id="private-key" name="private-key" required rows={4}/>
                          </div>
                      </div>
                      <DialogFooter>
                          <DialogClose asChild><Button type="submit">Install Certificate</Button></DialogClose>
                      </DialogFooter>
                  </form>
              </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires On</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.domain}>
                  <TableCell className="font-medium">{cert.domain}</TableCell>
                  <TableCell>{cert.type}</TableCell>
                  <TableCell>
                    <Badge variant={cert.status === 'Active' ? 'default' : 'destructive'}>
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{cert.expires}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" disabled>Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

    