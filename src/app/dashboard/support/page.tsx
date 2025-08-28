"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TicketStatus = "Open" | "Answered" | "Closed";
type Ticket = {
    id: string;
    subject: string;
    status: TicketStatus;
    updated: string;
};

const initialTickets: Ticket[] = [
    { id: "#TKT-001", subject: "Cannot connect to FTP", status: "Open", updated: "2 hours ago" },
    { id: "#TKT-002", subject: "SSL Certificate not renewing", status: "Answered", updated: "1 day ago" },
    { id: "#TKT-003", subject: "Question about billing", status: "Closed", updated: "5 days ago" },
];
    
const statusVariant: { [key: string]: "destructive" | "default" | "outline" } = {
    Open: "destructive",
    Answered: "default",
    Closed: "outline",
};

export default function SupportPage() {
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const { toast } = useToast();

    const handleNewTicket = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const subject = formData.get("subject") as string;
        
        const newTicket: Ticket = {
            id: `#TKT-${String(tickets.length + 1).padStart(3, '0')}`,
            subject,
            status: "Open",
            updated: "Just now"
        };
        setTickets([newTicket, ...tickets]);
        toast({ title: "Success", description: "Your support ticket has been submitted."});
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
                    <p className="text-muted-foreground">Get help and track your support requests.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Ticket
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Support Ticket</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleNewTicket}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" name="subject" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" name="message" required rows={5} />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button type="submit">Submit Ticket</Button></DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>My Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ticket ID</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-medium">{ticket.id}</TableCell>
                                    <TableCell>{ticket.subject}</TableCell>
                                    <TableCell><Badge variant={statusVariant[ticket.status]}>{ticket.status}</Badge></TableCell>
                                    <TableCell>{ticket.updated}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">View</Button>
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
