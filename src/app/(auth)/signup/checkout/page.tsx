
'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const plans = {
    shared: { name: "Shared Hosting", price: "$9/month" },
    cloud: { name: "Cloud Hosting", price: "$29/month" },
    vps: { name: "VPS Hosting", price: "$59/month" },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') as keyof typeof plans || 'cloud';
  const selectedPlan = plans[planId];

  return (
    <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
            <Logo className="justify-center mb-4" />
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase and create your account.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                 <h2 className="text-xl font-semibold mb-4">1. Your Plan</h2>
                 <Card>
                    <CardHeader>
                        <CardTitle>{selectedPlan.name}</CardTitle>
                        <CardDescription>Billed monthly. You can cancel anytime.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{selectedPlan.price}</p>
                    </CardContent>
                 </Card>
                 <div className="mt-6 text-sm text-muted-foreground">
                    By clicking "Complete Purchase", you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
                 </div>
            </div>
            <div>
                 <h2 className="text-xl font-semibold mb-4">2. Account & Payment</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Create your account</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="full-name">Full name</Label>
                            <Input id="full-name" placeholder="John Doe" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                    </CardContent>
                    <Separator className="my-4" />
                    <CardHeader className="pt-0">
                         <CardTitle>Payment Details</CardTitle>
                         <CardDescription>Enter your card information.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
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
                    </CardContent>
                    <CardFooter className="flex-col items-stretch gap-4">
                        <Button type="submit" className="w-full as-child">
                          <Link href="/signup/verify-email">Complete Purchase</Link>
                        </Button>
                         <p className="text-center text-sm text-muted-foreground">
                            Already have an account? <Link href="/login" className="underline">Login</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}

    