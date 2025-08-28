import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Folder, File, Upload, Download, Trash2, Edit, PlusCircle } from "lucide-react";

const files = [
  { name: "public_html", type: "folder", size: "4.2 MB", modified: "2024-07-15 10:30" },
  { name: "index.html", type: "file", size: "12 KB", modified: "2024-07-15 09:15" },
  { name: ".htaccess", type: "file", size: "1.5 KB", modified: "2024-07-14 18:00" },
  { name: "images", type: "folder", size: "2.1 MB", modified: "2024-07-13 11:45" },
];

export default function FileManagerPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Manager</h1>
          <p className="text-muted-foreground">Manage your website's files and folders.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload</Button>
            <Button><PlusCircle className="mr-2 h-4 w-4"/> New Folder</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Files for mydomain.com</CardTitle>
          <CardDescription>/home/user/public_html</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.name}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {file.type === 'folder' ? <Folder className="h-4 w-4 text-primary" /> : <File className="h-4 w-4 text-muted-foreground" />}
                    {file.name}
                  </TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.modified}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon"><Download className="h-4 w-4"/></Button>
                    <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
