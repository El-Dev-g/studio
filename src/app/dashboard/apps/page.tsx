"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { DownloadCloud } from "lucide-react";

// A simple placeholder for app icons. In a real app, these would be actual images/icons.
const AppIcon = ({ name }: { name: string }) => (
    <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl font-bold text-muted-foreground">{name.charAt(0)}</span>
    </div>
);

const apps = [
    { 
        name: "WordPress", 
        description: "The world's most popular CMS for blogs and websites.",
    },
    { 
        name: "Next.js", 
        description: "A powerful React framework for modern web applications.",
    },
    { 
        name: "Laravel", 
        description: "A PHP web application framework with expressive, elegant syntax.",
    },
    { 
        name: "Magento", 
        description: "A feature-rich e-commerce platform for growing businesses.",
    },
    {
        name: "Joomla",
        description: "A flexible and powerful content management system.",
    },
    {
        name: "Drupal",
        description: "An open-source CMS for ambitious digital experiences.",
    }
];

export default function AppMarketplacePage() {
    const { toast } = useToast();
    const [appToInstall, setAppToInstall] = useState<string | null>(null);

    const handleInstall = () => {
        if (!appToInstall) return;
        toast({
            title: "Installation Started",
            description: `${appToInstall} is being installed on your hosting. You'll be notified upon completion.`,
        });
        setAppToInstall(null);
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">App Marketplace</h1>
                <p className="text-muted-foreground">Install popular applications with a single click.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {apps.map((app) => (
                    <Card key={app.name} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-center">
                                <AppIcon name={app.name} />
                            </div>
                            <CardTitle className="text-center">{app.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription className="text-center">{app.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                           <Dialog onOpenChange={(open) => !open && setAppToInstall(null)}>
                                <DialogTrigger asChild>
                                    <Button className="w-full" onClick={() => setAppToInstall(app.name)}>
                                        <DownloadCloud className="mr-2 h-4 w-4" />
                                        Install
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Confirm Installation</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to install {app.name} on your hosting account?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                        <DialogClose asChild><Button onClick={handleInstall}>Confirm & Install</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
