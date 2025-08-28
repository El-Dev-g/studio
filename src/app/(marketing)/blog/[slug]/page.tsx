
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const blogPosts = [
    {
        title: "The Ultimate Guide to Choosing a Domain Name",
        slug: "the-ultimate-guide-to-choosing-a-domain-name",
        category: "Domains",
        excerpt: "Your domain name is the cornerstone of your online identity. This guide will walk you through everything you need to know to pick the perfect one.",
        author: "Alex Johnson",
        avatar: "https://picsum.photos/id/1011/40/40",
        image: "https://picsum.photos/1200/800",
        imageHint: "abstract keyboard"
    },
    {
        title: "5 Reasons Why Your Business Needs a Professional Email",
        slug: "5-reasons-why-your-business-needs-a-professional-email",
        category: "Email",
        excerpt: "Discover why using a custom email address like 'you@yourdomain.com' is crucial for building trust and brand recognition.",
        author: "Maria Garcia",
        avatar: "https://picsum.photos/id/1025/40/40",
        image: "https://picsum.photos/1200/800",
        imageHint: "person typing"
    },
    {
        title: "A Beginner’s Guide to Web Hosting: Shared vs. VPS vs. Dedicated",
        slug: "a-beginners-guide-to-web-hosting-shared-vs-vps-vs-dedicated",
        category: "Hosting",
        excerpt: "Confused by the different types of web hosting? We break down the pros and cons of each to help you make an informed decision.",
        author: "Chris Lee",
        avatar: "https://picsum.photos/id/1027/40/40",
        image: "https://picsum.photos/1200/800",
        imageHint: "server room"
    }
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

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
            <main className="flex-1 py-12 md:py-24 lg:py-32">
                <article className="container px-4 md:px-6 max-w-3xl mx-auto">
                    <div className="space-y-4 mb-8">
                        <Link href="/blog" className="flex items-center gap-2 text-sm text-primary hover:underline">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>
                        <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
                         <div className="flex items-center gap-4 pt-4">
                            <Avatar>
                                <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person avatar"/>
                                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{post.author}</p>
                                <p className="text-sm text-muted-foreground">Staff Writer / July 23, 2024</p>
                            </div>
                        </div>
                    </div>
                    
                    <Image 
                        src={post.image} 
                        alt={post.title} 
                        width={1200} 
                        height={800} 
                        className="rounded-lg aspect-video object-cover my-8" 
                        data-ai-hint={post.imageHint}
                    />

                    <div className="prose prose-lg max-w-none text-foreground/90">
                        <p>{post.excerpt}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicul. Donec nonummy, eni, un, suere, commodo pulvinar, est utish uttisies metuis ets modus nus.</p>
                    </div>
                </article>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 SkyHost. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link href="/terms-of-service" className="text-xs hover:underline underline-offset-4">
                    Terms of Service
                </Link>
                <Link href="/privacy-policy" className="text-xs hover:underline underline-offset-4">
                    Privacy
                </Link>
                </nav>
            </footer>
        </div>
    );
}
