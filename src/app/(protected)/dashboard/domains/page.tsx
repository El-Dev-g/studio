"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const initialDomains = [
  { name: "mydomain.com", status: "Active", expiry: "2025-06-15", records: 5 },
  { name: "another-site.dev", status: "Active", expiry: "2024-09-22", records: 8 },
  { name: "portfolio.me", status: "Redirect", expiry: "2026-01-10", records: 2 },
];

type Domain = {
    name: string;
    status: string;
    expiry: string;
    records: number;
};

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const { toast } = useToast();

  const handleConnectDomain = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const domainName = formData.get("domainName") as string;
    
    if (domains.find(d => d.name === domainName)) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "This domain is already connected."
        });
        return;
    }

    const newDomain: Domain = {
        name: domainName,
        status: "Active",
        expiry: "2026-07-20",
        records: 0
    };
    setDomains([...domains, newDomain]);
    toast({
        title: "Success",
        description: `Domain ${domainName} connected successfully.`
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Domain Management</h1>
          <p className="text-muted-foreground">Connect and manage your domains.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Connect Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Domain</DialogTitle>
              <DialogDescription>
                Enter the domain name you want to connect.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleConnectDomain}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="domainName">Domain Name</Label>
                        <Input id="domainName" name="domainName" placeholder="example.com" required />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="submit">Connect</Button></DialogClose>
                </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>My Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires On</TableHead>
                <TableHead>DNS Records</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.map((domain) => (
                <TableRow key={domain.name}>
                  <TableCell className="font-medium">{domain.name}</TableCell>
                  <TableCell><Badge variant={domain.status === 'Active' ? 'default' : 'secondary'}>{domain.status}</Badge></TableCell>
                  <TableCell>{domain.expiry}</TableCell>
                  <TableCell>{domain.records}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/domains/${domain.name}`}>Manage DNS</Link>
                    </Button>
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
