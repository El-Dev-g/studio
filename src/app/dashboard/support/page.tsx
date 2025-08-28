import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export default function SupportPage() {
    const tickets = [
        { id: "#TKT-001", subject: "Cannot connect to FTP", status: "Open", updated: "2 hours ago" },
        { id: "#TKT-002", subject: "SSL Certificate not renewing", status: "Answered", updated: "1 day ago" },
        { id: "#TKT-003", subject: "Question about billing", status: "Closed", updated: "5 days ago" },
    ];
    
    const statusVariant: { [key: string]: "destructive" | "default" | "outline" } = {
        Open: "destructive",
        Answered: "default",
        Closed: "outline",
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
                    <p className="text-muted-foreground">Get help and track your support requests.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Ticket
                </Button>
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
