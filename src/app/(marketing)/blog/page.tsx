
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

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

export default function BlogPage() {
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
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Blog</h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Tips, tutorials, and news from the SkyHost team.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    </div>
                </section>
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
                 <Link href="/status" className="text-xs hover:underline underline-offset-4">
                    Status
                  </Link>
                </nav>
            </footer>
        </div>
    );
}
