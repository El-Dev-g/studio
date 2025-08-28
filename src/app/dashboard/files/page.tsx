"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileManager } from "@/components/dashboard/file-manager";
import { FtpAccounts } from "@/components/dashboard/ftp-accounts";
import { Databases } from "@/components/dashboard/databases";
import { File, Globe, Database } from "lucide-react";


export default function FileManagerPage() {

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">File Management</h1>
        <p className="text-muted-foreground">Manage your website's files, FTP accounts, and databases.</p>
      </div>

      <Tabs defaultValue="manager" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manager"><File className="mr-2 h-4 w-4" /> File Manager</TabsTrigger>
          <TabsTrigger value="ftp"><Globe className="mr-2 h-4 w-4" /> FTP Accounts</TabsTrigger>
          <TabsTrigger value="databases"><Database className="mr-2 h-4 w-4" /> Databases</TabsTrigger>
        </TabsList>
        <TabsContent value="manager">
          <FileManager />
        </TabsContent>
        <TabsContent value="ftp">
          <FtpAccounts />
        </TabsContent>
        <TabsContent value="databases">
          <Databases />
        </TabsContent>
      </Tabs>
    </div>
  );
}
