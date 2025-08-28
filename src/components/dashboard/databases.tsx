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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialDatabases = [
    { name: "wp_mydomain", user: "wp_user", size: "85 MB", type: "MySQL" },
    { name: "dev_database", user: "dev_user", size: "15 MB", type: "PostgreSQL" },
];

type Database = {
    name: string;
    user: string;
    size: string;
    type: "MySQL" | "PostgreSQL";
}

export function Databases() {
  const [databases, setDatabases] = useState<Database[]>(initialDatabases);
  const [dbToDelete, setDbToDelete] = useState<Database | null>(null);
  const { toast } = useToast();

  const handleCreateDb = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDb: Database = {
        name: formData.get("dbname") as string,
        user: formData.get("dbuser") as string,
        size: "0 MB",
        type: formData.get("type") as "MySQL" | "PostgreSQL",
    };
    setDatabases([...databases, newDb]);
    toast({ title: "Success", description: "Database created successfully." });
  };
  
  const handleDeleteDb = () => {
    if (!dbToDelete) return;
    setDatabases(databases.filter(db => db.name !== dbToDelete.name));
    setDbToDelete(null);
    toast({ title: "Success", description: "Database deleted successfully." });
  };

  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Databases</CardTitle>
            <CardDescription>Manage your MySQL & PostgreSQL databases.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4"/> New Database</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Database</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateDb}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                             <Label htmlFor="type">Database Type</Label>
                            <Select name="type" required defaultValue="MySQL">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MySQL">MySQL</SelectItem>
                                    <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dbname">Database Name</Label>
                            <Input id="dbname" name="dbname" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dbuser">Database User</Label>
                            <Input id="dbuser" name="dbuser" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dbpass">Password</Label>
                            <Input id="dbpass" name="dbpass" type="password" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="submit">Create Database</Button></DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Database Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Database User</TableHead>
                <TableHead>Size</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {databases.map((db) => (
                <TableRow key={db.name}>
                  <TableCell className="font-medium">{db.name}</TableCell>
                  <TableCell>{db.type}</TableCell>
                  <TableCell>{db.user}</TableCell>
                  <TableCell>{db.size}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline">phpMyAdmin</Button>
                    <Button variant="outline" size="icon" disabled><Edit className="h-4 w-4"/></Button>
                    <Dialog onOpenChange={(open) => !open && setDbToDelete(null)}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={() => setDbToDelete(db)}><Trash2 className="h-4 w-4"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                   This will permanently delete the database {db.name} and its user.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <DialogClose asChild><Button variant="destructive" onClick={handleDeleteDb}>Delete</Button></DialogClose>
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
