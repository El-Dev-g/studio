
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Edit, Mailbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialEmailAccounts = [
    { address: "contact@mydomain.com", usage: "250 MB / 1 GB", forwarders: 2, domain: "mydomain.com" },
    { address: "support@mydomain.com", usage: "50 MB / 1 GB", forwarders: 0, domain: "mydomain.com" },
    { address: "john.doe@another-site.dev", usage: "750 MB / 2 GB", forwarders: 1, domain: "another-site.dev" },
];

const availableDomains = ["mydomain.com", "another-site.dev", "portfolio.me"];

type EmailAccount = {
    address: string;
    usage: string;
    forwarders: number;
    domain: string;
};

export default function EmailManagementPage() {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>(initialEmailAccounts);
  const [accountToDelete, setAccountToDelete] = useState<EmailAccount | null>(null);
  const { toast } = useToast();

  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const domain = formData.get("domain") as string;
    const newAccount: EmailAccount = {
        address: `${username}@${domain}`,
        usage: "0 MB / 1 GB",
        forwarders: 0,
        domain: domain
    };
    setEmailAccounts([...emailAccounts, newAccount]);
    toast({ title: "Success", description: "Email account created successfully." });
  };
  
  const handleDeleteAccount = () => {
    if (!accountToDelete) return;
    setEmailAccounts(emailAccounts.filter(a => a.address !== accountToDelete.address));
    setAccountToDelete(null);
    toast({ title: "Success", description: "Email account deleted successfully." });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Hosting</h1>
          <p className="text-muted-foreground">Create and manage your email accounts, forwarders and access webmail.</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Email Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Email Account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateAccount}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div className="grid gap-2 col-span-2 sm:col-span-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username" placeholder="contact" required />
                            </div>
                             <div className="grid gap-2 col-span-2 sm:col-span-1">
                                <Label htmlFor="domain">Domain</Label>
                                <Select name="domain" required defaultValue={availableDomains[0]}>
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        {availableDomains.map(domain => (
                                            <SelectItem key={domain} value={domain}>@{domain}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="submit">Create Account</Button></DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
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
                    <Button variant="outline" size="sm" disabled><Mailbox className="mr-2 h-4 w-4" /> Webmail</Button>
                    <Button variant="outline" size="icon" disabled><Edit className="h-4 w-4"/></Button>
                    <Dialog onOpenChange={(open) => !open && setAccountToDelete(null)}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={() => setAccountToDelete(account)}><Trash2 className="h-4 w-4"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    This will permanently delete the email account {account.address}.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</DialogClose>
                                <DialogClose asChild><Button variant="destructive" onClick={handleDeleteAccount}>Delete</Button></DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
