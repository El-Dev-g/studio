
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { LoaderCircle } from "lucide-react";

const DEFAULT_AVATAR = "https://picsum.photos/id/237/40/40";

export default function SettingsPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    useEffect(() => {
        if(user) {
            setAvatarUrl(user.photoURL || DEFAULT_AVATAR);
            setName(user.displayName || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsLoading(true);
        try {
            await updateProfile(user, { displayName: name });
            // In a real app, you would also need to handle email updates
            // which often require verification.
            toast({
                title: "Success!",
                description: "Your profile has been updated.",
            });
        } catch (error: any) {
             toast({ variant: "destructive", title: "Error", description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.email) return;

        setIsPasswordLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const currentPassword = formData.get("current-password") as string;
        const newPassword = formData.get("new-password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        if (newPassword !== confirmPassword) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "New passwords do not match.",
            });
            setIsPasswordLoading(false);
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            // Re-authenticate the user before changing the password
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            toast({
                title: "Success!",
                description: "Your password has been updated.",
            });
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Error updating password",
                description: error.code === 'auth/wrong-password' ? 'Incorrect current password.' : error.message,
            });
        } finally {
            setIsPasswordLoading(false);
        }
    };

    const handleAvatarUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // In a real app, you'd upload the file and get a URL, then call `updateProfile`.
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatarUrl(newAvatarUrl);
             toast({
                title: "Avatar updated",
                description: "Click 'Save Changes' to apply your new profile picture.",
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
                        <AvatarFallback>{name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
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
                                <AvatarFallback>{name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2 flex-grow">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={email} readOnly />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
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
                        <Button type="submit" disabled={isPasswordLoading}>
                            {isPasswordLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
