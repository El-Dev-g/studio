
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup/checkout?plan=cloud">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <article className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: July 24, 2024</p>
          </div>
          <div className="prose prose-lg max-w-none mt-12 text-foreground/90">
            <p>Welcome to SkyHost. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
            
            <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
            <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use SkyHost if you do not agree to all of the terms and conditions stated on this page.</p>
            
            <h2 className="text-2xl font-semibold mt-8">2. Intellectual Property Rights</h2>
            <p>Other than the content you own, under these Terms, SkyHost and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.</p>

            <h2 className="text-2xl font-semibold mt-8">3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>publishing any website material in any other media;</li>
              <li>selling, sublicensing and/or otherwise commercializing any website material;</li>
              <li>publicly performing and/or showing any website material;</li>
              <li>using this Website in any way that is or may be damaging to this Website;</li>
              <li>using this Website in any way that impacts user access to this Website;</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">4. Your Content</h2>
            <p>In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant SkyHost a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>

            <h2 className="text-2xl font-semibold mt-8">5. Limitation of liability</h2>
            <p>In no event shall SkyHost, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. SkyHost, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

            <h2 className="text-2xl font-semibold mt-8">6. Governing Law & Jurisdiction</h2>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the State for the resolution of any disputes.</p>
          </div>
        </article>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 SkyHost. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms-of-service" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
           <Link href="/status" className="text-xs hover:underline underline-offset-4">
            Status
          </Link>
        </nav>
      </footer>
    </div>
  );
}
