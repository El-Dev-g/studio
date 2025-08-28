import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Download, PlusCircle } from "lucide-react";

const certificates = [
    { domain: "mydomain.com", type: "Let's Encrypt", status: "Active", expires: "2024-10-12" },
    { domain: "another-site.dev", type: "Premium SSL", status: "Active", expires: "2025-01-01" },
    { domain: "portfolio.me", type: "Let's Encrypt", status: "Expired", expires: "2024-06-01" },
];

export default function SslManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SSL/TLS Management</h1>
          <p className="text-muted-foreground">Secure your domains with SSL certificates.</p>
        </div>
         <Button><PlusCircle className="mr-2 h-4 w-4" /> Install SSL</Button>
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
                    <Button variant="outline" size="sm">Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Free Let's Encrypt SSL</CardTitle>
          <CardDescription>All our plans come with free, automatic SSL from Let's Encrypt.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-full">
                <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
                <p className="font-semibold">Automatic SSL is enabled</p>
                <p className="text-muted-foreground">We'll automatically renew your certificates for you.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
