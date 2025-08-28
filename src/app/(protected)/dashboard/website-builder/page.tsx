
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Wand2, ArrowRight, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWebsiteAction } from "@/app/actions";
import type { GenerateWebsiteOutput } from "@/ai/flows/generate-website";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as Icons from "lucide-react";

// A type guard to check if a string is a valid Lucide icon name
function isLucideIcon(name: string): name is keyof typeof Icons {
  return name in Icons;
}

// A component to dynamically render a Lucide icon
const DynamicIcon = ({ name, ...props }: { name: string } & Icons.LucideProps) => {
  if (isLucideIcon(name)) {
    const IconComponent = Icons[name];
    return <IconComponent {...props} />;
  }
  // Fallback icon if the name is invalid
  return <Info {...props} />;
};


export default function AIWebsiteBuilderPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [websiteContent, setWebsiteContent] = useState<GenerateWebsiteOutput | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setWebsiteContent(null);
        
        const formData = new FormData(event.currentTarget);
        const description = formData.get('description') as string;

        const result = await generateWebsiteAction(description);
        
        if ('error' in result) {
            toast({
                variant: "destructive",
                title: "An error occurred",
                description: result.error,
            });
        } else {
            setWebsiteContent(result);
        }
        
        setIsLoading(false);
    };

    const Preview = () => {
        if (!websiteContent) return null;

        const { hero, features, ctaSection, palette } = websiteContent;

        const pageStyle = {
            '--preview-primary-hsl': palette.primary,
            '--preview-secondary-hsl': palette.secondary,
            '--preview-primary': `hsl(${palette.primary})`,
            '--preview-primary-foreground': '#ffffff',
            '--preview-secondary': `hsl(${palette.secondary})`,
        } as React.CSSProperties;

        return (
            <div className="w-full rounded-xl border bg-card shadow-lg overflow-hidden mt-8" style={pageStyle}>
                <div className="relative isolate overflow-hidden bg-background">
                    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl" style={{ color: 'var(--preview-primary)' }}>
                                {hero.title}
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">{hero.subtitle}</p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Button style={{ backgroundColor: 'var(--preview-primary)', color: 'var(--preview-primary-foreground)' }}>{hero.cta}</Button>
                                <Button variant="link">Learn more <ArrowRight className="ml-2 h-4 w-4"/></Button>
                            </div>
                        </div>
                        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                           <Image
                                src="https://picsum.photos/800/600"
                                alt="App screenshot"
                                data-ai-hint="abstract technology"
                                width={800}
                                height={600}
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-border"
                           />
                        </div>
                    </div>
                </div>

                <div className="bg-secondary py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Everything you need to get started
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                {features.map((feature) => (
                                <div key={feature.title} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-foreground">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-background" style={{ backgroundColor: 'var(--preview-primary)' }}>
                                        <DynamicIcon name={feature.icon} className="h-6 w-6 text-white" style={{ color: 'var(--preview-primary-foreground)' }}/>
                                    </div>
                                    {feature.title}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
                                </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
                 <div className="bg-background">
                    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="relative isolate overflow-hidden bg-secondary px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                {ctaSection.title}
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                {ctaSection.subtitle}
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <Button style={{ backgroundColor: 'var(--preview-primary)', color: 'var(--preview-primary-foreground)' }}>{ctaSection.cta}</Button>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            <Image
                                className="absolute left-0 top-0 w-[48rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                                src="https://picsum.photos/800/400"
                                data-ai-hint="abstract tech background"
                                alt="App screenshot"
                                width={800}
                                height={400}
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                    <Wand2 className="text-primary" />
                    AI Website Builder
                    </CardTitle>
                    <CardDescription className="text-md">
                    Describe your business, and our AI will generate a stunning, professional website preview for you in seconds.
                    </CardDescription>
                </CardHeader>
                {!websiteContent && (
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="description" className="font-semibold">Website Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="e.g., A modern coffee shop in downtown that serves artisanal coffee and freshly baked pastries."
                                rows={4}
                                required
                                disabled={isLoading}
                                className="text-base"
                            />
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                            {isLoading ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                            ) : (
                            <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                Generate Website
                            </>
                            )}
                        </Button>
                        </CardFooter>
                    </form>
                )}
                {isLoading && (
                    <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
                        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground text-lg">Our AI is building your website...</p>
                        <p className="text-sm text-muted-foreground">This may take a moment.</p>
                    </CardContent>
                )}
                 {websiteContent && !isLoading && (
                    <CardContent>
                        <div className="rounded-lg bg-secondary p-4 flex items-center gap-4">
                            <CheckCircle className="h-8 w-8 text-primary"/>
                            <div>
                                <h3 className="text-lg font-semibold">Your website preview is ready!</h3>
                                <p className="text-muted-foreground">Scroll down to see the generated website. You can edit the description and regenerate if needed.</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button onClick={() => setWebsiteContent(null)}>
                                <Wand2 className="mr-2 h-4 w-4"/>
                                Start Over
                            </Button>
                        </div>
                    </CardContent>
                )}
            </Card>

            {websiteContent && !isLoading && <Preview />}
        </div>
    );
}
