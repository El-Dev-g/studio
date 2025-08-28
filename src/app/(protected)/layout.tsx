import { redirect } from 'next/navigation';

// This is a simulated authentication check.
// In a real application, you'd check for a valid session or token.
const isAuthenticated = true;

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthenticated) {
    redirect('/signup');
  }

  return <>{children}</>;
}
