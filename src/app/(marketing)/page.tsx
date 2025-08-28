

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { DomainSuggester } from '@/components/domain-suggester';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const plans = [
    { id: 'shared', name: "Shared Hosting", price: "$9", period: "/month", features: ["1 Website", "50 GB SSD Storage", "Weekly Backups", "Free SSL"], popular: false },
    { id: 'cloud', name: "Cloud Hosting", price: "$29", period: "/month", features: ["5 Websites", "200 GB SSD Storage", "Daily Backups", "Free CDN", "Dedicated IP"], popular: true },
    { id: 'vps', name: "VPS Hosting", price: "$59", period: "/month", features: ["Scalable Resources", "Full Root Access", "Daily Backups", "Staging Environment"], popular: false }
]

const blogPosts = [
    {
        title: "The Ultimate Guide to Choosing a Domain Name",
        slug: "the-ultimate-guide-to-choosing-a-domain-name",
        category: "Domains", 
        excerpt: "Your domain name is the cornerstone of your online identity. This guide will walk you through everything you need to know to pick the perfect one.",
        author: "Alex Johnson",
        avatar: "https://picsum.photos/id/1011/40/40",
        image: "https://picsum.photos/800/600",
        imageHint: "abstract keyboard"
    },
    {
        title: "5 Reasons Why Your Business Needs a Professional Email",
        slug: "5-reasons-why-your-business-needs-a-professional-email",
        category: "Email", 
        excerpt: "Discover why using a custom email address like 'you@yourdomain.com' is crucial for building trust and brand recognition.",
        author: "Maria Garcia",
        avatar: "https://picsum.photos/id/1025/40/40",
        image: "https://picsum.photos/800/600",
        imageHint: "person typing"
    },
    {
        title: "A Beginner’s Guide to Web Hosting: Shared vs. VPS vs. Dedicated",
        slug: "a-beginners-guide-to-web-hosting-shared-vs-vps-vs-dedicated",
        category: "Hosting", 
        excerpt: "Confused by the different types of web hosting? We break down the pros and cons of each to help you make an informed decision.",
        author: "Chris Lee",
        avatar: "https://picsum.photos/id/1027/40/40",
        image: "https://picsum.photos/800/600",
        imageHint: "server room"
    }
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
            <Link href="/signup/checkout?plan=cloud">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-card border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  Modern Web Hosting Platform
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover the perfect domain and launch your website with ease. Powerful tools, AI-driven suggestions, and rock-solid reliability.
                </p>
                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button asChild size="lg">
                        <Link href="/signup/checkout?plan=cloud">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="#plans">View Plans</Link>
                    </Button>
                </div>
              </div>
               <Image
                src="https://picsum.photos/1200/800"
                width={1200}
                height={800}
                alt="Hero"
                data-ai-hint="abstract technology"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
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
                              <Link href={`/signup/checkout?plan=${plan.id}`}>Choose Plan</Link>
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
        
        <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">From Our Blog</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Get the latest tips, tricks, and industry news from our team of experts.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="block hover:scale-105 transition-transform duration-200">
                            <Card className="flex flex-col overflow-hidden h-full">
                               <Image 
                                src={post.image} 
                                alt={post.title} 
                                width={800} 
                                height={600} 
                                data-ai-hint={post.imageHint}
                                className="aspect-video object-cover" />
                               <CardHeader>
                                   <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                                   <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                               </CardHeader>
                               <CardContent className="flex-grow">
                                   <p className="text-muted-foreground">{post.excerpt}</p>
                               </CardContent>
                               <CardFooter className="flex items-center gap-4 pt-4">
                                    <Avatar>
                                        <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person avatar"/>
                                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{post.author}</p>
                                        <p className="text-sm text-muted-foreground">Staff Writer</p>
                                    </div>
                               </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
                 <div className="mt-12 text-center">
                    <Button variant="outline" asChild>
                        <Link href="/blog">
                            Read More Articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="subscribe" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
            <div className="container px-4 md:px-6">
                <div className="max-w-xl mx-auto text-center">
                     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Subscribe to Our Newsletter</h2>
                     <p className="mt-4 text-muted-foreground md:text-xl">
                        Stay up to date with the latest news, offers, and announcements from SkyHost.
                     </p>
                     <form className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                        <Input type="email" placeholder="Enter your email" className="flex-1 text-base" />
                        <Button type="submit">Subscribe</Button>
                     </form>
                </div>
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
