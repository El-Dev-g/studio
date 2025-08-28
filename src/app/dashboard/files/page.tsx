"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder, File, Upload, Download, Trash2, Edit, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialFiles = [
  { name: "public_html", type: "folder", size: "4.2 MB", modified: "2024-07-15 10:30" },
  { name: "index.html", type: "file", size: "12 KB", modified: "2024-07-15 09:15" },
  { name: ".htaccess", type: "file", size: "1.5 KB", modified: "2024-07-14 18:00" },
  { name: "images", type: "folder", size: "2.1 MB", modified: "2024-07-13 11:45" },
];

type FileItem = {
    name: string;
    type: 'folder' | 'file';
    size: string;
    modified: string;
}

export default function FileManagerPage() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);
  const { toast } = useToast();

  const handleNewFolder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const folderName = formData.get("folderName") as string;
    const newFolder: FileItem = {
        name: folderName,
        type: 'folder',
        size: '0 KB',
        modified: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    setFiles([newFolder, ...files]);
    toast({title: "Success", description: `Folder "${folderName}" created.`});
  };
  
  const handleDeleteFile = () => {
    if (!fileToDelete) return;
    setFiles(files.filter(f => f.name !== fileToDelete.name));
    setFileToDelete(null);
    toast({title: "Success", description: `"${fileToDelete.name}" has been deleted.`});
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Manager</h1>
          <p className="text-muted-foreground">Manage your website's files and folders.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast({ title: "Not implemented", description: "File upload is not yet available." })}><Upload className="mr-2 h-4 w-4"/> Upload</Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><PlusCircle className="mr-2 h-4 w-4"/> New Folder</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleNewFolder}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="folderName">Folder Name</Label>
                                <Input id="folderName" name="folderName" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button type="submit">Create Folder</Button></DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
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
                    <Button variant="outline" size="icon" disabled><Download className="h-4 w-4"/></Button>
                    <Button variant="outline" size="icon" disabled><Edit className="h-4 w-4"/></Button>
                    <Dialog onOpenChange={(open) => !open && setFileToDelete(null)}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={() => setFileToDelete(file)}><Trash2 className="h-4 w-4"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                   This will permanently delete {file.name}.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <DialogClose asChild><Button variant="destructive" onClick={handleDeleteFile}>Delete</Button></DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
