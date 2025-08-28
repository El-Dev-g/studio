
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const initialUsers = [
    { email: "user@example.com", role: "Owner", status: "Active" },
    { email: "teammate1@example.com", role: "Admin", status: "Active" },
    { email: "pending@example.com", role: "Developer", status: "Pending" },
];

type User = {
    email: string;
    role: "Owner" | "Admin" | "Developer" | "Billing";
    status: "Active" | "Pending";
};

export default function TeamPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast();

  const handleInviteUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const role = formData.get("role") as User["role"];

    if (users.find(u => u.email === email)) {
        toast({ variant: "destructive", title: "Error", description: "This user is already part of the team." });
        return;
    }

    const newUser: User = {
        email,
        role,
        status: "Pending",
    };
    setUsers([...users, newUser]);
    toast({ title: "Success", description: `Invitation sent to ${email}.` });
  };
  
  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers(users.filter(u => u.email !== userToDelete.email));
    setUserToDelete(null);
    toast({ title: "Success", description: "User removed from the team." });
  };


  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
                <p className="text-muted-foreground">Invite and manage team members.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Invite User</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite New User</DialogTitle>
                        <DialogDescription>Enter the email and assign a role to the new team member.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleInviteUser}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" type="email" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                 <Select name="role" required defaultValue="Developer">
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Developer">Developer</SelectItem>
                                        <SelectItem value="Billing">Billing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button type="submit">Send Invitation</Button></DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage who has access to this workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell><Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>{user.status}</Badge></TableCell>
                  <TableCell className="text-right space-x-2">
                     {user.role !== "Owner" && (
                        <>
                        <Button variant="outline" size="icon" disabled><Edit className="h-4 w-4"/></Button>
                        <Dialog onOpenChange={(open) => !open && setUserToDelete(null)}>
                            <DialogTrigger asChild>
                                <Button variant="destructive" size="icon" onClick={() => setUserToDelete(user)}><Trash2 className="h-4 w-4"/></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogDescription>
                                        This will remove {user.email} from the team.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                    <DialogClose asChild><Button variant="destructive" onClick={handleDeleteUser}>Remove User</Button></DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        </>
                     )}
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
