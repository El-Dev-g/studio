import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DomainsPage() {
  const domains = [
    { name: "mydomain.com", status: "Active", expiry: "2025-06-15", records: 5 },
    { name: "another-site.dev", status: "Active", expiry: "2024-09-22", records: 8 },
    { name: "portfolio.me", status: "Redirect", expiry: "2026-01-10", records: 2 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Domain Management</h1>
          <p className="text-muted-foreground">Connect and manage your domains.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Connect Domain
        </Button>
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
