
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, History, RotateCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const initialBackups = [
  { date: "2024-07-22", type: "Full", size: "1.2 GB" },
  { date: "2024-07-21", type: "Full", size: "1.2 GB" },
  { date: "2024-07-20", type: "Full", size: "1.1 GB" },
  { date: "2024-07-19", type: "Database", size: "85 MB" },
];

type Backup = {
    date: string;
    type: string;
    size: string;
};

export default function BackupsPage() {
    const { toast } = useToast();
    const [backups, setBackups] = useState<Backup[]>(initialBackups);
    const [backupToDelete, setBackupToDelete] = useState<Backup | null>(null);

    const handleGenerateBackup = () => {
        const newBackup: Backup = {
            date: new Date().toISOString().slice(0, 10),
            type: "Full",
            size: "1.3 GB",
        };
        setBackups([newBackup, ...backups]);
        toast({ title: "Backup Generation Started", description: "A new full backup is being generated. This may take a few minutes."});
    };
    
    const handleDeleteBackup = () => {
        if (!backupToDelete) return;
        setBackups(backups.filter(b => b.date !== backupToDelete.date));
        setBackupToDelete(null);
        toast({ title: "Success", description: "Backup deleted successfully." });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Automated Backups</h1>
                    <p className="text-muted-foreground">Manage and restore your website backups.</p>
                </div>
                <Button onClick={handleGenerateBackup}>
                    <History className="mr-2 h-4 w-4" />
                    Generate New Backup
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Available Backups</CardTitle>
                    <CardDescription>Backups are retained for the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {backups.map((backup) => (
                                <TableRow key={backup.date}>
                                    <TableCell className="font-medium">{backup.date}</TableCell>
                                    <TableCell>{backup.type}</TableCell>
                                    <TableCell>{backup.size}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon" disabled><Download className="h-4 w-4"/></Button>
                                        <Button variant="outline" size="icon" disabled><RotateCw className="h-4 w-4"/></Button>
                                        <Dialog onOpenChange={(open) => !open && setBackupToDelete(null)}>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" size="icon" onClick={() => setBackupToDelete(backup)}><Trash2 className="h-4 w-4"/></Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure?</DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be undone. This will permanently delete the backup from {backup.date}.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                                    <DialogClose asChild><Button variant="destructive" onClick={handleDeleteBackup}>Delete</Button></DialogClose>
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
    )
}
