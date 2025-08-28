
'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const plans = {
    shared: { name: "Shared Hosting", price: "$9/month", yearlyPrice: "$99/year" },
    cloud: { name: "Cloud Hosting", price: "$29/month", yearlyPrice: "$299/year" },
    vps: { name: "VPS Hosting", price: "$59/month", yearlyPrice: "$599/year" },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') as keyof typeof plans || 'cloud';
  const selectedPlan = plans[planId];
  const [domain, setDomain] = useState<string | null>(null);
  const [searchedDomain, setSearchedDomain] = useState('');
  const { toast } = useToast();

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!searchedDomain) return;

    // Simulate domain availability check
    if(searchedDomain.includes('.')) {
        setDomain(searchedDomain);
        toast({ title: "Success!", description: `${searchedDomain} is available.` });
    } else {
        toast({ variant: "destructive", title: "Invalid Domain", description: "Please enter a valid domain name." });
    }
  }
   const handleExistingDomain = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const existingDomain = formData.get("existingDomain") as string;
    if(existingDomain && existingDomain.includes('.')) {
        setDomain(existingDomain);
        toast({ title: "Domain Added", description: `You will be prompted to update nameservers for ${existingDomain} after setup.` });
    } else {
        toast({ variant: "destructive", title: "Invalid Domain", description: "Please enter a valid domain name." });
    }
  }

  return (
    <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
            <Logo className="justify-center mb-4" />
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase by following the steps below.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
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
                 </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">2. Choose Your Domain</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <Tabs defaultValue="register">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="register">Register a new domain</TabsTrigger>
                                    <TabsTrigger value="transfer">Use my existing domain</TabsTrigger>
                                </TabsList>
                                <TabsContent value="register" className="pt-4">
                                     <form onSubmit={handleDomainSearch} className="flex gap-2">
                                        <Input 
                                            value={searchedDomain}
                                            onChange={(e) => setSearchedDomain(e.target.value)}
                                            placeholder="findyourdomain.com" 
                                        />
                                        <Button type="submit">Search</Button>
                                    </form>
                                </TabsContent>
                                <TabsContent value="transfer" className="pt-4">
                                    <form onSubmit={handleExistingDomain} className="flex gap-2">
                                        <Input name="existingDomain" placeholder="yourdomain.com" required/>
                                        <Button type="submit">Use Domain</Button>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                 </div>
            </div>
            <div className="space-y-8">
                 <div>
                     <h2 className="text-xl font-semibold mb-4">3. Account & Payment</h2>
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
                        <Separator />
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex justify-between">
                               <span>{selectedPlan.name} (Monthly)</span>
                               <span>{selectedPlan.price.replace('/month','')}</span>
                           </div>
                           {domain && (
                            <div className="flex justify-between font-medium text-primary">
                               <span>Domain: {domain}</span>
                               <span>$15.00</span>
                           </div>
                           )}
                           <Separator />
                           <div className="flex justify-between font-bold text-lg">
                               <span>Total Due Today</span>
                               <span>{domain ? `$${29 + 15}.00` : selectedPlan.price.replace('/month','')}</span>
                           </div>
                        </CardContent>
                        <Separator />
                        <CardHeader>
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
                            <div className="text-sm text-muted-foreground text-center">
                                By clicking "Complete Purchase", you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
                            </div>
                            <p className="text-center text-sm text-muted-foreground pt-4 border-t w-full">
                                Already have an account? <Link href="/login" className="underline">Login</Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
