
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Wand2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWebsiteAction } from "@/app/actions";
import type { GenerateWebsiteOutput } from "@/ai/flows/generate-website";

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

        const { htmlContent } = websiteContent;

        // We need to inject the Tailwind CSS link into the iframe's content
        const contentWithTailwind = `
            <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://unpkg.com/lucide@latest"></script>
            </head>
            <body>
                ${htmlContent}
                <script>
                    lucide.createIcons();
                </script>
            </body>
        `;

        return (
             <div className="w-full rounded-xl border bg-card shadow-lg overflow-hidden mt-8">
                <div className="bg-slate-100 p-2 border-b">
                    <p className="text-sm text-center font-medium">Website Preview</p>
                </div>
                <iframe
                    srcDoc={contentWithTailwind}
                    className="w-full h-[70vh]"
                    sandbox="allow-scripts allow-same-origin"
                    title="AI Generated Website Preview"
                />
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
