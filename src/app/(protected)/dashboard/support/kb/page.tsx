"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";


const faqItems = [
    { 
        question: "How do I connect my domain?", 
        answer: "To connect your domain, go to the Domains page, click 'Connect Domain', and follow the on-screen instructions to update your DNS records at your domain registrar." 
    },
    { 
        question: "How do I setup a new email account?",
        answer: "Navigate to the Email Management page and click 'Create Email Account'. Fill in the required details like the email address and password, and your account will be created instantly."
    },
    { 
        question: "What is the process for installing an SSL certificate?",
        answer: "Our platform provides free Let's Encrypt SSL certificates that are automatically installed and renewed for all connected domains. If you need to install a custom certificate, you can do so from the SSL Management page."
    },
    {
        question: "How can I access my website's files?",
        answer: "You can use the File Manager directly in your dashboard to upload, download, and manage your files. We also provide FTP access details if you prefer using a client like FileZilla."
    },
    {
        question: "What are the nameservers for my hosting?",
        answer: "Our nameservers are ns1.skyhost.com and ns2.skyhost.com. You should point your domain's nameservers to these to use our hosting services."
    }
]

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/support"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
            <p className="text-muted-foreground">Find answers to common questions.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search articles..." className="pl-10" />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
