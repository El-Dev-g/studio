
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const services = [
    { name: "Web Servers", status: "Operational", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    { name: "Database Services", status: "Operational", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    { name: "Control Panel API", status: "Operational", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    { name: "Email Services", status: "Operational", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    { name: "AI Services", status: "Degraded Performance", icon: <AlertTriangle className="h-5 w-5 text-yellow-500" /> },
    { name: "Support System", status: "Operational", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
];

const incidents = [
    {
        title: "AI Services Experiencing High Latency",
        status: "Investigating",
        description: "We are currently investigating reports of high latency and slow response times from our AI services. We will provide an update shortly.",
        timestamp: "July 24, 2024 14:30 UTC"
    },
    {
        title: "Resolved: Minor Database Connectivity Issues",
        status: "Resolved",
        description: "The intermittent connectivity issues with our database clusters have been resolved. All services are back to normal.",
        timestamp: "July 23, 2024 08:00 UTC"
    }
];

export default function StatusPage() {
    const isAllOperational = services.every(s => s.status === "Operational");

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
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Service Status</h1>
            <p className="text-muted-foreground text-xl">
                Real-time updates on the status of our services.
            </p>
          </div>

          <Card className="mt-12">
            <CardHeader className={isAllOperational ? "bg-green-50" : "bg-yellow-50"}>
                 <div className="flex items-center gap-4">
                    {isAllOperational ? (
                        <CheckCircle className="h-10 w-10 text-green-500" />
                    ) : (
                        <AlertTriangle className="h-10 w-10 text-yellow-500" />
                    )}
                    <div>
                        <CardTitle className="text-2xl">{isAllOperational ? "All Systems Operational" : "Degraded Performance"}</CardTitle>
                        <CardDescription>
                            Last updated: {new Date().toLocaleTimeString()}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                {services.map(service => (
                    <div key={service.name} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                            {service.icon}
                            <span className="font-medium">{service.name}</span>
                        </div>
                        <Badge variant={service.status === 'Operational' ? 'default' : 'destructive'}>{service.status}</Badge>
                    </div>
                ))}
            </CardContent>
          </Card>

          <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Past Incidents</h2>
            <div className="space-y-8">
                {incidents.map((incident, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 p-4">
                            <CardTitle className="text-xl">{incident.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                           <div className="flex items-center justify-between text-sm">
                               <Badge variant={incident.status === 'Resolved' ? 'secondary' : 'default'}>{incident.status}</Badge>
                               <span className="text-muted-foreground flex items-center gap-2">
                                   <Clock className="h-4 w-4" />
                                   {incident.timestamp}
                                </span>
                           </div>
                           <p className="text-muted-foreground">{incident.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </div>
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
