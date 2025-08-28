import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center">
            <MailCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Verify your email</CardTitle>
        <CardDescription>
          We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button type="submit" className="w-full as-child">
          <Link href="/dashboard">Continue to Dashboard</Link>
        </Button>
        <p className="text-center text-sm text-muted-foreground">
            Didn't receive an email? <Link href="#" className="underline">Resend verification link</Link>
        </p>
      </CardContent>
    </Card>
  );
}
