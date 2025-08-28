"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialAccounts = [
    { user: "ftpuser1", path: "/public_html", usage: "5.2 GB" },
    { user: "dev_ftp", path: "/public_html/dev", usage: "1.1 GB" },
];

type FtpAccount = {
    user: string;
    path: string;
    usage: string;
}

export function FtpAccounts() {
  const [accounts, setAccounts] = useState<FtpAccount[]>(initialAccounts);
  const [accountToDelete, setAccountToDelete] = useState<FtpAccount | null>(null);
  const { toast } = useToast();
  
  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAccount: FtpAccount = {
        user: formData.get("username") as string,
        path: formData.get("path") as string,
        usage: "0 MB",
    };
    setAccounts([...accounts, newAccount]);
    toast({ title: "Success", description: "FTP account created successfully." });
  };

  const handleDeleteAccount = () => {
    if (!accountToDelete) return;
    setAccounts(accounts.filter(a => a.user !== accountToDelete.user));
    setAccountToDelete(null);
    toast({ title: "Success", description: "FTP account deleted successfully." });
  };


  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>FTP Accounts</CardTitle>
            <CardDescription>Manage FTP access to your files.</CardDescription>
          </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><PlusCircle className="mr-2 h-4 w-4"/> New Account</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create FTP Account</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateAccount}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username" required />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="path">Directory</Label>
                                <Input id="path" name="path" defaultValue="/public_html/" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button type="submit">Create Account</Button></DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.user}>
                  <TableCell className="font-medium">{account.user}</TableCell>
                  <TableCell>{account.path}</TableCell>
                  <TableCell>{account.usage}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" disabled><Edit className="h-4 w-4"/></Button>
                    <Dialog onOpenChange={(open) => !open && setAccountToDelete(null)}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={() => setAccountToDelete(account)}><Trash2 className="h-4 w-4"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                   This will permanently delete the FTP account {account.user}.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
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
  );
}
