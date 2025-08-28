"use client";

import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return redirect('/login');
  }

  return <>{children}</>;
}
