"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
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

export default function SslManagementPage() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SSL/TLS Management</h1>
          <p className="text-muted-foreground">Install and manage custom SSL certificates.</p>
        </div>
         <Dialog>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Install SSL</Button>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installed Certificates</CardTitle>
          <CardDescription>Manage your existing SSL certificates.</CardDescription>
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
