import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, ArrowLeft, Trash2, Edit } from "lucide-react";
import Link from "next/link";

const dnsRecords = [
    { type: 'A', name: '@', value: '76.76.21.21', ttl: '3600' },
    { type: 'CNAME', name: 'www', value: 'mydomain.com', ttl: '3600' },
    { type: 'MX', name: '@', value: 'mail.example.com', ttl: '3600' },
    { type: 'TXT', name: '_dmarc', value: 'v=DMARC1; p=none', ttl: '3600' },
];

export default function DomainDetailsPage({ params }: { params: { domain: string } }) {
  const domainName = decodeURIComponent(params.domain);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/domains"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage {domainName}</h1>
          <p className="text-muted-foreground">View and edit DNS records for your domain.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>DNS Records</CardTitle>
                <CardDescription>Manage the DNS records for {domainName}.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Record
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>TTL</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dnsRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell><Badge variant="secondary">{record.type}</Badge></TableCell>
                  <TableCell className="font-mono">{record.name}</TableCell>
                  <TableCell className="font-mono">{record.value}</TableCell>
                  <TableCell>{record.ttl}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
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
