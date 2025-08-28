
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
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const plans = {
    shared: { name: "Shared Hosting", price: 9, description: "For personal sites & blogs" },
    cloud: { name: "Cloud Hosting", price: 29, description: "For small businesses & pros" },
    vps: { name: "VPS Hosting", price: 59, description: "For high-traffic websites" },
};

const addons = [
    { id: "ddos", name: "Enhanced DDoS Protection", description: "Advanced, always-on protection against network attacks.", price: 5 },
    { id: "backups", name: "Daily Cloud Backups", description: "Peace of mind with automated daily off-site backups.", price: 3 },
    { id: "ssl", name: "Premium Wildcard SSL", description: "Secure your main domain and all subdomains with one certificate.", price: 8 },
    { id: "email", name: "Professional Email", description: "Build trust with a custom email address for your domain.", price: 2 },
];

type PlanId = keyof typeof plans;

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const initialPlanId = searchParams.get('plan') as PlanId || 'cloud';
  
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(initialPlanId);
  const selectedPlan = useMemo(() => ({ ...plans[selectedPlanId], id: selectedPlanId }), [selectedPlanId]);

  const [domain, setDomain] = useState<string | null>(null);
  const [domainPrice, setDomainPrice] = useState(0);
  const [searchedDomain, setSearchedDomain] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<typeof addons[0][]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const planIdFromUrl = searchParams.get('plan') as PlanId;
    if (planIdFromUrl && plans[planIdFromUrl]) {
        setSelectedPlanId(planIdFromUrl);
    }
  }, [searchParams]);

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!searchedDomain) return;

    if(searchedDomain.includes('.')) {
        setDomain(searchedDomain);
        setDomainPrice(15); // Simulate registration fee
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
        setDomainPrice(0); // No charge for using existing
        toast({ title: "Domain Added", description: `You will be prompted to update nameservers for ${existingDomain} after setup.` });
    } else {
        toast({ variant: "destructive", title: "Invalid Domain", description: "Please enter a valid domain name." });
    }
  }

  const handleAddonToggle = (addon: typeof addons[0]) => {
    setSelectedAddons(prev => 
        prev.some(a => a.id === addon.id) 
            ? prev.filter(a => a.id !== addon.id)
            : [...prev, addon]
    );
  }
  
  const total = useMemo(() => {
    const planPrice = selectedPlan.price;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return planPrice + domainPrice + addonsPrice;
  }, [selectedPlan, domainPrice, selectedAddons]);


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
                    <h2 className="text-xl font-semibold mb-4">1. Choose Your Plan</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {(Object.keys(plans) as PlanId[]).map(planId => (
                            <Card 
                                key={planId} 
                                className={cn("cursor-pointer flex flex-col", selectedPlanId === planId ? "border-primary ring-2 ring-primary" : "hover:shadow-md")}
                                onClick={() => setSelectedPlanId(planId)}
                            >
                                <CardHeader>
                                    <CardTitle>{plans[planId].name}</CardTitle>
                                    <CardDescription>{plans[planId].description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-2xl font-bold">${plans[planId].price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                                </CardContent>
                                {selectedPlanId === planId && (
                                    <CardFooter>
                                        <CheckCircle className="h-5 w-5 text-primary"/>
                                        <p className="ml-2 text-sm font-semibold text-primary">Selected</p>
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>
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
                 <div>
                    <h2 className="text-xl font-semibold mb-4">3. Recommended Addons</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            {addons.map(addon => (
                                <div key={addon.id} className="flex items-start p-4 border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-secondary">
                                    <Checkbox 
                                        id={addon.id} 
                                        className="mt-1"
                                        onCheckedChange={() => handleAddonToggle(addon)}
                                    />
                                    <div className="ml-4 flex-grow">
                                        <Label htmlFor={addon.id} className="font-semibold text-base">{addon.name}</Label>
                                        <p className="text-muted-foreground text-sm">{addon.description}</p>
                                    </div>
                                    <p className="font-semibold whitespace-nowrap ml-4">${addon.price.toFixed(2)}/mo</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="space-y-8">
                 <div>
                     <h2 className="text-xl font-semibold mb-4">4. Account & Payment</h2>
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
                               <span>${selectedPlan.price.toFixed(2)}</span>
                           </div>
                           {domain && (
                            <div className="flex justify-between">
                               <span>Domain: {domain}</span>
                               <span>${domainPrice.toFixed(2)}</span>
                           </div>
                           )}
                           {selectedAddons.map(addon => (
                               <div key={addon.id} className="flex justify-between">
                                   <span>{addon.name}</span>
                                   <span>${addon.price.toFixed(2)}</span>
                               </div>
                           ))}
                           <Separator />
                           <div className="flex justify-between font-bold text-lg">
                               <span>Total Due Today</span>
                               <span>${total.toFixed(2)}</span>
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
