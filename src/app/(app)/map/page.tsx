
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, PlusCircle, Search } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from 'next/image';

interface ReportItem {
    id: string;
    reportType: 'lost' | 'found';
    name: string;
    branch: string;
    itemName: string;
    image?: string; // Data URL for the image
    contactNo: string;
    contactPlace: string;
    remarks?: string;
}

export default function MapPage() {
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [lostItems, setLostItems] = useState<ReportItem[]>([]);
    const [foundItems, setFoundItems] = useState<ReportItem[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { toast } = useToast();

    const handleReportSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const imageFile = data.image as File;
        let imageUrl: string | undefined = undefined;

        if (imageFile && imageFile.size > 0) {
            imageUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(imageFile);
            });
        }
        
        const newReport: ReportItem = {
            id: `item-${Date.now()}`,
            reportType: data.reportType as 'lost' | 'found',
            name: data.name as string,
            branch: data.branch as string,
            itemName: data.itemName as string,
            image: imageUrl,
            contactNo: data.contactNo as string,
            contactPlace: data.contactPlace as string,
            remarks: data.remarks as string,
        };

        if (newReport.reportType === 'lost') {
            setLostItems(prev => [newReport, ...prev]);
        } else {
            setFoundItems(prev => [newReport, ...prev]);
        }
        
        setFormSubmitted(true);
    }
    
    const resetForm = () => {
        setIsReportDialogOpen(false);
        setFormSubmitted(false);
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
                <Dialog open={isReportDialogOpen} onOpenChange={(open) => {
                    setIsReportDialogOpen(open);
                    if (!open) {
                        setFormSubmitted(false);
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Report a Lost or Found Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[480px]">
                         {!formSubmitted ? (
                             <form onSubmit={handleReportSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Report an Item</DialogTitle>
                                    <DialogDescription>
                                        Please provide as much detail as possible about the item.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">Type</Label>
                                        <RadioGroup name="reportType" defaultValue="lost" className="col-span-3 flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="lost" id="r1" />
                                                <Label htmlFor="r1">Lost</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="found" id="r2" />
                                                <Label htmlFor="r2">Found</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
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
                                        <Input 
                                          id="contactNo" 
                                          name="contactNo" 
                                          type="tel"
                                          pattern="[0-9]{10}"
                                          maxLength={10}
                                          className="col-span-3" 
                                          required
                                          onInput={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            target.value = target.value.replace(/[^0-9]/g, '');
                                          }}
                                        />
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
                         ) : (
                            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                                <Check className="h-12 w-12 text-green-500" />
                                <h3 className="text-xl font-bold">Report Submitted!</h3>
                                <p className="text-muted-foreground">Thank you for your submission. You can see your report in the relevant tab.</p>
                                <Button onClick={resetForm} className="mt-4">Close</Button>
                            </div>
                         )}
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
                        {lostItems.length === 0 ? (
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <p className="text-muted-foreground">No lost items have been reported recently.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {lostItems.map(item => (
                                    <Card key={item.id}>
                                        {item.image && (
                                            <div className="relative h-40 w-full">
                                                <Image src={item.image} alt={item.itemName} layout="fill" objectFit="cover" className="rounded-t-lg" />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle>{item.itemName}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-2">
                                            <p><span className="font-semibold">Reported by:</span> {item.name}</p>
                                            <p><span className="font-semibold">Branch:</span> {item.branch}</p>
                                            {item.remarks && <p><span className="font-semibold">Remarks:</span> {item.remarks}</p>}
                                        </CardContent>
                                        <CardFooter className="flex-col items-start text-sm">
                                            <p className="font-semibold">Contact Details:</p>
                                            <p>Number: {item.contactNo}</p>
                                            <p>Place: {item.contactPlace}</p>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="found" className="mt-4">
                        {foundItems.length === 0 ? (
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                 <p className="text-muted-foreground">No found items have been reported recently.</p>
                            </div>
                        ) : (
                             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {foundItems.map(item => (
                                    <Card key={item.id}>
                                        {item.image && (
                                            <div className="relative h-40 w-full">
                                                <Image src={item.image} alt={item.itemName} layout="fill" objectFit="cover" className="rounded-t-lg" />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle>{item.itemName}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-2">
                                            <p><span className="font-semibold">Found by:</span> {item.name}</p>
                                            <p><span className="font-semibold">Branch:</span> {item.branch}</p>
                                            {item.remarks && <p><span className="font-semibold">Remarks:</span> {item.remarks}</p>}
                                        </CardContent>
                                         <CardFooter className="flex-col items-start text-sm">
                                            <p className="font-semibold">Contact Details:</p>
                                            <p>Number: {item.contactNo}</p>
                                            <p>Place: {item.contactPlace}</p>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}

    