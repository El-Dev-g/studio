import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { DomainSuggester } from '@/components/domain-suggester';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const plans = [
    { name: "Shared Hosting", price: "$9", period: "/month", features: ["1 Website", "50 GB SSD Storage", "Weekly Backups", "Free SSL"], popular: false },
    { name: "Cloud Hosting", price: "$29", period: "/month", features: ["5 Websites", "200 GB SSD Storage", "Daily Backups", "Free CDN", "Dedicated IP"], popular: true },
    { name: "VPS Hosting", price: "$59", period: "/month", features: ["Scalable Resources", "Full Root Access", "Daily Backups", "Staging Environment"], popular: false }
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  Modern Web Hosting Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover the perfect domain and launch your website with ease. Powerful tools, AI-driven suggestions, and rock-solid reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="plans" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Hosting Plans</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Choose the perfect plan for your needs. All plans include our 30-day money-back guarantee.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                            <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                              <Link href="/signup">Choose Plan</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
          </div>
        </section>

        <section id="domain-suggester" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <DomainSuggester />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 SkyHost. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
