
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck, LoaderCircle, CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleVerification = async () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      // Redirect after a short delay to show the verified message
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }, 2000);
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center">
            {isVerified ? (
                <CheckCircle className="h-12 w-12 text-green-500" />
            ) : (
                <MailCheck className="h-12 w-12 text-primary" />
            )}
        </div>
        <CardTitle className="text-2xl">
            {isVerified ? "Email Verified!" : "Verify your email"}
        </CardTitle>
        <CardDescription>
          {isVerified 
            ? "You will be redirected to your dashboard shortly."
            : "We've sent a verification link to your email address. Please check your inbox and click the link to activate your account."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={handleVerification} disabled={isVerifying || isVerified}>
          {isVerifying ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : isVerified ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Verified!
            </>
          ) : (
            "Verify Email & Continue"
          )}
        </Button>
        {!isVerified && (
            <p className="text-center text-sm text-muted-foreground">
                Didn't receive an email? <Link href="#" className="underline">Resend verification link</Link>
            </p>
        )}
      </CardContent>
    </Card>
  );
}
