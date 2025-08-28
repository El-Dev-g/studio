import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2, Edit } from "lucide-react";

const emailAccounts = [
    { address: "contact@mydomain.com", usage: "250 MB / 1 GB", forwarders: 2 },
    { address: "support@mydomain.com", usage: "50 MB / 1 GB", forwarders: 0 },
    { address: "john.doe@another-site.dev", usage: "750 MB / 2 GB", forwarders: 1 },
];

export default function EmailManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Management</h1>
          <p className="text-muted-foreground">Create and manage your email accounts.</p>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Email Account</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Email Accounts</CardTitle>
          <CardDescription>Manage email accounts for your domains.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email Address</TableHead>
                <TableHead>Storage Usage</TableHead>
                <TableHead>Forwarders</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailAccounts.map((account) => (
                <TableRow key={account.address}>
                  <TableCell className="font-medium">{account.address}</TableCell>
                  <TableCell>{account.usage}</TableCell>
                  <TableCell>{account.forwarders}</TableCell>
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
