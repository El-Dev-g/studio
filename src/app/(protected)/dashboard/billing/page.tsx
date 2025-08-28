
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const invoices = [
    { id: "INV-1234", date: "2024-06-15", amount: "$29.00", status: "Paid" },
    { id: "INV-1233", date: "2024-05-15", amount: "$29.00", status: "Paid" },
    { id: "INV-1232", date: "2024-04-15", amount: "$29.00", status: "Paid" },
];

const StripeIcon = () => (
    <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.6667 6.66667C42.6667 4.13333 41.2 2.8 39 2.8C36.8 2.8 35.3333 4.13333 35.3333 6.66667C35.3333 9.2 36.8 10.5333 39 10.5333C41.2 10.5333 42.6667 9.2 42.6667 6.66667ZM47.6 19.4667H43.0667V1.06667H47.6V5.46667C47.6 7.2 48 8.4 48 10C48 11.6 47.6 12.8 47.6 14.6V19.4667ZM36.6667 19.4667H32.1333V1.06667H36.6667V19.4667ZM30.1333 19.4667H25.6V1.06667H30.1333V5.46667C30.1333 8.13333 29.2 10 25.6 10V10.1333C29.2 10.1333 30.1333 11.8667 30.1333 14.6V19.4667ZM23.4667 19.4667H20.5333L16.4 1.06667H21.2L22 6.8C22.2667 8.53333 22.4 9.46667 22.4 9.46667H22.5333C22.5333 9.46667 22.6667 8.53333 22.9333 6.8L23.7333 1.06667H28.5333L24.4 19.4667H23.4667ZM13.8667 19.4667H9.33333V1.06667H17.6C19.7333 1.06667 21.0667 2.13333 21.0667 4.53333C21.0667 6.4 20 7.6 18.2667 8.13333L21.4667 19.4667H16.5333L14 10H13.8667V19.4667ZM13.8667 6.8H16.2667C17.2 6.8 17.7333 6.13333 17.7333 5.2C17.7333 4.26667 17.2 3.6 16.2667 3.6H13.8667V6.8ZM6.8 19.4667H2.26667V1.06667H6.8V5.46667C6.8 8.13333 5.86667 10 2.26667 10V10.1333C5.86667 10.1333 6.8 11.8667 6.8 14.6V19.4667Z" fill="#635BFF"/>
    </svg>
);

const PayPalIcon = () => (
    <svg width="60" height="20" viewBox="0 0 79 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9248 19.8339H19.2618L21.9056 0.126953H14.9398L14.0728 5.7627H7.72898L5.09214 0.126953H0.126953L4.76483 19.8339H9.2618L10.9953 8.93259H15.1118L12.9248 19.8339Z" fill="#253B80"/>
        <path d="M37.8927 8.66579C37.4589 8.23204 36.5919 7.86579 35.2911 7.86579H31.8499L31.1831 11.7765H34.4578C35.826 11.7765 36.8593 11.4102 37.4589 10.4767C37.8927 9.87723 38.0648 9.27771 37.8927 8.66579ZM40.0728 8.19954C40.4063 6.19991 39.4061 4.53423 37.3916 4.53423H30.4596L27.8228 0.126953H22.8576L27.4955 19.8339H33.4278L34.162 15.3601H34.4578C36.0579 15.3601 37.5255 15.1534 38.5925 14.2864C40.0601 13.0858 40.7944 11.1528 40.0728 8.19954Z" fill="#253B80"/>
        <path d="M57.6534 5.36307C57.0539 4.86348 56.1196 4.53423 54.8863 4.53423H50.5828L47.946 0.126953H42.9808L47.6187 19.8339H53.6848L53.251 16.9691H53.5478C54.4821 16.9691 55.4164 16.8354 56.2834 16.3358C58.3653 15.1352 59.2996 12.9348 58.7331 10.3346C58.3669 8.29901 57.6534 6.76566 56.5864 5.89868C56.5864 5.89868 56.5864 5.96617 57.6534 5.36307ZM55.4164 12.3768C55.0501 13.5099 54.1158 13.9761 53.0488 13.9761H50.249L51.3824 6.96929H53.6848C54.8863 6.96929 55.6198 7.43554 55.7883 8.26703C55.9568 9.03103 55.7883 9.96531 55.4164 12.3768Z" fill="#1899D6"/>
        <path d="M68.5441 5.7627H62.2011L61.3341 0.126953H56.3689L60.9998 19.8339H65.497L70.1349 0.126953H65.1697L64.2957 5.7627H68.5441ZM66.4284 16.6355H62.5349L60.8014 6.96929H64.6946L66.4284 16.6355Z" fill="#253B80"/>
        <path d="M78.1406 0.126953L73.3689 13.577L71.9013 4.53423H67.2634L71.3798 19.8339H76.0177L78.9337 2.19445L78.1406 0.126953Z" fill="#253B80"/>
    </svg>
);

const PaystackIcon = () => (
    <svg width="80" height="20" viewBox="0 0 101 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.84 4.81881C17.2023 3.49774 15.1119 2.75 12.6375 2.75C8.01252 2.75 4.5 5.79774 4.5 10.8864C4.5 14.6591 6.59038 17.5114 10.0226 18.7841L10.0455 18.7955C10.0455 18.7955 10.0226 18.8068 10.0341 18.8068C7.51421 18.8068 5.75 17.1136 5.75 14.9318H0C0 19.4545 4.09091 21.75 8.27273 21.75C12.3636 21.75 16.6364 19.4545 16.6364 14.8068C16.6364 11.2386 14.7273 8.35227 11.4545 7.14773C11.4318 7.13636 11.4545 7.125 11.4432 7.125C13.625 7.125 15.4091 8.32955 15.4091 10.3864H21.1591C21.1591 7.79545 20.4773 6.14773 18.84 4.81881Z" fill="#011B33"/>
        <path d="M26.8398 21.25H21.5V3H26.8398V21.25Z" fill="#011B33"/>
        <path d="M43.0898 21.25H37.75V3H43.0898V21.25Z" fill="#011B33"/>
        <path d="M59.3398 21.25H54.0001V3H59.3398V21.25Z" fill="#011B33"/>
        <path d="M50.4762 2.99998C46.8512 2.99998 44.0228 5.86362 44.0228 10.0454C44.0228 14.2273 46.8512 17.0909 50.4762 17.0909C54.1012 17.0909 56.9296 14.2273 56.9296 10.0454C56.9296 5.86362 54.1012 2.99998 50.4762 2.99998ZM50.4762 21.5C44.3853 21.5 38.6807 16.625 38.6807 10.0454C38.6807 3.4659 44.3853 -1.37111e-05 50.4762 -1.37111e-05C56.5671 -1.37111e-05 62.2716 3.4659 62.2716 10.0454C62.2716 16.625 56.5671 21.5 50.4762 21.5Z" fill="#011B33"/>
        <path d="M72.0671 21.25H66.7273V3H72.0671V21.25Z" fill="#011B33"/>
        <path d="M75.8853 14.75C75.8853 18.5227 78.4762 21.5 82.5671 21.5C86.658 21.5 90.75 18.5227 90.75 14.75V3H85.4091V14.4773C85.4091 15.8636 84.4535 16.9091 82.5671 16.9091C80.6807 16.9091 79.7262 15.8636 79.7262 14.4773V3H75.8853V14.75Z" fill="#011B33"/>
        <path d="M100.045 21.25H95.8636L91.6818 16.5V21.25H86.3409V3H91.6818V9.38636L95.5227 3H100.386L94.75 11.5L100.045 21.25Z" fill="#011B33"/>
    </svg>
);


export default function BillingPage() {
    const { toast } = useToast();

    const handlePaymentUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Success!",
            description: "Your payment method has been updated.",
        });
    };

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
                <CardFooter className="flex-col items-start gap-4">
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
                            <form onSubmit={handlePaymentUpdate}>
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
                                    <DialogClose asChild>
                                        <Button type="submit">Save changes</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                     <div className="flex items-center gap-4 pt-4 border-t w-full">
                        <p className="text-sm text-muted-foreground">We support:</p>
                        <div className="flex items-center gap-4">
                            <StripeIcon />
                            <PayPalIcon />
                            <PaystackIcon />
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>Invoices are generated automatically every month.</CardDescription>
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
