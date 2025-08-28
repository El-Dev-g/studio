
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DEFAULT_AVATAR = "https://picsum.photos/id/237/40/40";

export default function SettingsPage() {
    const { toast } = useToast();
    const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedAvatar = localStorage.getItem("user-avatar");
        if (storedAvatar) {
            setAvatarUrl(storedAvatar);
        }
    }, []);

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Success!",
            description: "Your profile has been updated.",
        });
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newPassword = formData.get("new-password");
        const confirmPassword = formData.get("confirm-password");

        if (newPassword !== confirmPassword) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "New passwords do not match.",
            });
            return;
        }

        toast({
            title: "Success!",
            description: "Your password has been updated.",
        });
        (e.target as HTMLFormElement).reset();
    };

    const handleAvatarUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // In a real app, you'd upload the file and get a URL.
            // Here, we'll simulate it by using a new placeholder.
            const newAvatarUrl = `https://picsum.photos/seed/${Math.random()}/40/40`;
            setAvatarUrl(newAvatarUrl);
            localStorage.setItem("user-avatar", newAvatarUrl);
            toast({
                title: "Profile picture updated!",
                description: "Your new photo is now visible.",
            });
        }
    };


    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and profile.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your avatar.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                     <Avatar className="h-20 w-20">
                        <AvatarImage src={avatarUrl} alt="User avatar" data-ai-hint="person avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-2">
                        <Button onClick={handleAvatarUpload}>Change Photo</Button>
                        <Input 
                            ref={fileInputRef}
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <form onSubmit={handleProfileSave}>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={avatarUrl} alt="User avatar" data-ai-hint="person avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2 flex-grow">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" defaultValue="Current User" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue="user@example.com" readOnly />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Save Changes</Button>
                    </CardFooter>
                </form>
            </Card>

            <Card>
                <form onSubmit={handlePasswordUpdate}>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password. Make sure it's a strong one.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" name="current-password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" name="new-password" type="password" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" name="confirm-password" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Update Password</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
