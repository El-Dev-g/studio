import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Download } from "lucide-react";

const plans = [
    { name: "Shared Hosting", price: "$9", period: "/month", features: ["1 Website", "50 GB SSD Storage", "Weekly Backups", "Free SSL"], popular: false },
    { name: "Cloud Hosting", price: "$29", period: "/month", features: ["5 Websites", "200 GB SSD Storage", "Daily Backups", "Free CDN", "Dedicated IP"], popular: true },
    { name: "VPS Hosting", price: "$59", period: "/month", features: ["Scalable Resources", "Full Root Access", "Daily Backups", "Staging Environment"], popular: false }
]

const invoices = [
    { id: "INV-1234", date: "2024-06-15", amount: "$29.00", status: "Paid" },
    { id: "INV-1233", date: "2024-05-15", amount: "$29.00", status: "Paid" },
    { id: "INV-1232", date: "2024-04-15", amount: "$29.00", status: "Paid" },
]

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
                <p className="text-muted-foreground">Manage your subscription and view invoices.</p>
            </div>
            
            <section>
                <h2 className="text-2xl font-semibold mb-4">Subscription Plans</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {plans.map(plan => (
                        <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg" : ""}>
                            <CardHeader>
                                {plan.popular && <Badge className="w-fit mb-2 bg-accent text-accent-foreground">Most Popular</Badge>}
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.period}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>Choose Plan</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
            
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
