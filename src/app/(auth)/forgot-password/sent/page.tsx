
'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck, ArrowLeft } from "lucide-react";

export default function ForgotPasswordSentPage() {
  return (
    <Card className="mx-auto max-w-sm w-full text-center">
      <CardHeader className="space-y-2">
        <div className="flex justify-center">
          <MailCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Check your email</CardTitle>
        <CardDescription>
          We've sent a password reset link to your email address. Please check your inbox to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <Button variant="outline" className="w-full" asChild>
            <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
