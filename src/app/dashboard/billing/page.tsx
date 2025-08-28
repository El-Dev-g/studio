"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const invoices = [
    { id: "INV-1234", date: "2024-06-15", amount: "$29.00", status: "Paid" },
    { id: "INV-1233", date: "2024-05-15", amount: "$29.00", status: "Paid" },
    { id: "INV-1232", date: "2024-04-15", amount: "$29.00", status: "Paid" },
];

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
                <p className="text-muted-foreground">Manage your subscription and view invoices.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Update your payment method used for all subscriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8" />
                        <div>
                            <p className="font-semibold">Visa ending in 1234</p>
                            <p className="text-muted-foreground">Expires 08/2026</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Update Payment Method</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Payment Method</DialogTitle>
                                <DialogDescription>
                                    Enter your new card details.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="**** **** **** 1234" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.amount}</TableCell>
                                    <TableCell><Badge variant="default">{invoice.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="icon"><Download className="h-4 w-4"/></Button>
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
