
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MapPage() {
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleReportSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        console.log("Lost Item Report:", data);

        toast({
            title: "Report Submitted",
            description: "Thank you for reporting the lost item.",
        });
        
        setIsReportDialogOpen(false);
    }

  return (
    <div className="container mx-auto space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Report an Item</CardTitle>
                <CardDescription>
                    Lost something? Or found something that belongs to someone else? Report it here.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Report a Lost or Found Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[480px]">
                         <form onSubmit={handleReportSubmit}>
                            <DialogHeader>
                                <DialogTitle>Report an Item</DialogTitle>
                                <DialogDescription>
                                    Please provide as much detail as possible about the item.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" name="name" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="branch" className="text-right">
                                        Branch & Dept
                                    </Label>
                                    <Input id="branch" name="branch" className="col-span-3" required />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="itemName" className="text-right">
                                        Item Name
                                    </Label>
                                    <Input id="itemName" name="itemName" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image" className="text-right">
                                        Image
                                    </Label>
                                    <Input id="image" name="image" type="file" className="col-span-3" accept="image/*" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="contactNo" className="text-right">
                                        Contact No.
                                    </Label>
                                    <Input id="contactNo" name="contactNo" type="number" min="0" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="contactPlace" className="text-right">
                                        Contact Place
                                    </Label>
                                    <Input id="contactPlace" name="contactPlace" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="remarks" className="text-right pt-2">
                                        Remarks
                                    </Label>
                                    <Textarea id="remarks" name="remarks" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Submit Report</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Browse Items</CardTitle>
                <CardDescription>
                    Check the lists below for lost and found items across campus.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Tabs defaultValue="lost">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="lost">
                            <Search className="mr-2 h-4 w-4" />
                            Lost Items
                        </TabsTrigger>
                        <TabsTrigger value="found">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Found Items
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="lost" className="mt-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <p className="text-muted-foreground">No lost items have been reported recently.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="found" className="mt-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                             <p className="text-muted-foreground">No found items have been reported recently.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
