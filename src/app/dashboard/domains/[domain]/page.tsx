"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, ArrowLeft, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const initialDnsRecords = [
    { type: 'A', name: '@', value: '76.76.21.21', ttl: '3600' },
    { type: 'CNAME', name: 'www', value: 'mydomain.com', ttl: '3600' },
    { type: 'MX', name: '@', value: 'mail.example.com', ttl: '3600' },
    { type: 'TXT', name: '_dmarc', value: 'v=DMARC1; p=none', ttl: '3600' },
];

type DnsRecord = {
    type: string;
    name: string;
    value: string;
    ttl: string;
};

export default function DomainDetailsPage({ params }: { params: { domain: string } }) {
  const domainName = decodeURIComponent(params.domain);
  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>(initialDnsRecords);
  const [recordToEdit, setRecordToEdit] = useState<DnsRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<DnsRecord | null>(null);
  const { toast } = useToast();

  const handleAddRecord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRecord: DnsRecord = {
        type: formData.get("type") as string,
        name: formData.get("name") as string,
        value: formData.get("value") as string,
        ttl: formData.get("ttl") as string,
    };
    setDnsRecords([...dnsRecords, newRecord]);
    toast({ title: "Success", description: "DNS record added successfully." });
  };

  const handleEditRecord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recordToEdit) return;

    const formData = new FormData(event.currentTarget);
    const updatedRecord: DnsRecord = {
        type: formData.get("type") as string,
        name: formData.get("name") as string,
        value: formData.get("value") as string,
        ttl: formData.get("ttl") as string,
    };
    setDnsRecords(dnsRecords.map(r => r === recordToEdit ? updatedRecord : r));
    setRecordToEdit(null);
    toast({ title: "Success", description: "DNS record updated successfully." });
  };

  const handleDeleteRecord = () => {
    if (!recordToDelete) return;
    setDnsRecords(dnsRecords.filter(r => r !== recordToDelete));
    setRecordToDelete(null);
    toast({ title: "Success", description: "DNS record deleted successfully." });
  };


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
            <Dialog>
                <DialogTrigger asChild>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Record</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add DNS Record</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddRecord} id="add-record-form">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Select name="type" required>
                                    <SelectTrigger><SelectValue placeholder="Select record type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">A</SelectItem>
                                        <SelectItem value="CNAME">CNAME</SelectItem>
                                        <SelectItem value="MX">MX</SelectItem>
                                        <SelectItem value="TXT">TXT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="value">Value</Label>
                                <Input id="value" name="value" required />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="ttl">TTL</Label>
                                <Input id="ttl" name="ttl" defaultValue="3600" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button type="submit">Add Record</Button></DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
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
                    <Dialog onOpenChange={(open) => !open && setRecordToEdit(null)}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setRecordToEdit(record)}><Edit className="h-4 w-4"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                             <DialogHeader>
                                <DialogTitle>Edit DNS Record</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditRecord}>
                                <div className="grid gap-4 py-4">
                                     <div className="grid gap-2">
                                        <Label htmlFor="edit-type">Type</Label>
                                        <Select name="type" defaultValue={record.type} required>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A">A</SelectItem>
                                                <SelectItem value="CNAME">CNAME</SelectItem>
                                                <SelectItem value="MX">MX</SelectItem>
                                                <SelectItem value="TXT">TXT</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-name">Name</Label>
                                        <Input id="edit-name" name="name" defaultValue={record.name} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-value">Value</Label>
                                        <Input id="edit-value" name="value" defaultValue={record.value} required />
                                    </div>
                                     <div className="grid gap-2">
                                        <Label htmlFor="edit-ttl">TTL</Label>
                                        <Input id="edit-ttl" name="ttl" defaultValue={record.ttl} required />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="submit">Save Changes</Button></DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog onOpenChange={(open) => !open && setRecordToDelete(null)}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={() => setRecordToDelete(record)}><Trash2 className="h-4 w-4"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the DNS record.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <DialogClose asChild><Button variant="destructive" onClick={handleDeleteRecord}>Delete</Button></DialogClose>
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
