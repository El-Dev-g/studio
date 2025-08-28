
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Wand2, CheckCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBlogPostAction } from "@/app/actions";
import type { GenerateBlogPostOutput } from "@/ai/flows/generate-blog-post";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Markdown from 'react-markdown';


export default function AIBlogGeneratorPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [generatedPost, setGeneratedPost] = useState<GenerateBlogPostOutput | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setGeneratedPost(null);
        
        const formData = new FormData(event.currentTarget);
        const topic = formData.get('topic') as string;

        const result = await generateBlogPostAction(topic);
        
        if ('error' in result) {
            toast({
                variant: "destructive",
                title: "An error occurred",
                description: result.error,
            });
        } else {
            setGeneratedPost(result);
        }
        
        setIsLoading(false);
    };

    const PostPreview = () => {
        if (!generatedPost) return null;

        return (
            <Card className="w-full max-w-4xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <FileText className="text-primary" />
                        Generated Post
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <AlertTitle className="text-2xl font-bold tracking-tight">{generatedPost.title}</AlertTitle>
                        <AlertDescription>
                            <article className="prose prose-lg max-w-none text-foreground/90 mt-4">
                                <Markdown>{generatedPost.content}</Markdown>
                            </article>
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter className="gap-2">
                     <Button onClick={() => navigator.clipboard.writeText(`${generatedPost.title}\n\n${generatedPost.content}`)}>Copy Markdown</Button>
                     <Button variant="outline" onClick={() => setGeneratedPost(null)}>Start New Post</Button>
                </CardFooter>
            </Card>
        )
    };

    return (
        <div className="space-y-8">
            {!generatedPost && (
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                        <Wand2 className="text-primary" />
                        AI Blog Post Generator
                        </CardTitle>
                        <CardDescription className="text-md">
                        Provide a topic or a title, and our AI will write a complete blog post for you in Markdown format.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="topic" className="font-semibold">Blog Post Topic</Label>
                            <Textarea
                                id="topic"
                                name="topic"
                                placeholder="e.g., 'The Top 5 Benefits of Cloud Hosting for Small Businesses' or just 'benefits of cloud hosting'"
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
                                Generate Post
                            </>
                            )}
                        </Button>
                        </CardFooter>
                    </form>
                </Card>
            )}

            {isLoading && (
                <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
                    <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground text-lg">Our AI is writing your blog post...</p>
                    <p className="text-sm text-muted-foreground">This may take a moment.</p>
                </CardContent>
            )}

            {generatedPost && !isLoading && <PostPreview />}

        </div>
    );
}
