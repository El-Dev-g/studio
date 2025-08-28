"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
    const { toast } = useToast();

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

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and profile.</p>
            </div>

            <Card>
                <form onSubmit={handleProfileSave}>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" defaultValue="Current User" />
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
