
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, PlusCircle, Search } from "lucide-react";
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
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "@/hooks/use-auth";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ReportItem {
    id: string;
    reportType: 'lost' | 'found';
    itemName: string;
    imageURL?: string;
    contactNumber: string;
    location: string;
    remarks?: string;
    reporterName?: string;
    reporterBranch?: string;
    finderName?: string;
    finderBranch?: string;
}

export default function MapPage() {
    const { user } = useAuth();
    const { firestore } = useFirebase();

    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const lostItemsRef = useMemoFirebase(() => firestore && collection(firestore, 'lost_item_reports'), [firestore]);
    const { data: lostItems, isLoading: isLoadingLost } = useCollection<ReportItem>(lostItemsRef);

    const foundItemsRef = useMemoFirebase(() => firestore && collection(firestore, 'found_item_reports'), [firestore]);
    const { data: foundItems, isLoading: isLoadingFound } = useCollection<ReportItem>(foundItemsRef);


    const handleReportSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            toast({ variant: 'destructive', title: 'Not logged in', description: 'You must be logged in to report an item.' });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const imageFile = data.image as File;
        let imageUrl: string | undefined = undefined;

        try {
            if (imageFile && imageFile.size > 0) {
                const storage = getStorage();
                const storageRef = ref(storage, `lost-and-found/${Date.now()}_${imageFile.name}`);
                const uploadResult = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(uploadResult.ref);
            }
            
            const reportType = data.reportType as 'lost' | 'found';
            let newReport: any = {
                itemName: data.itemName as string,
                location: data.location as string,
                contactNumber: data.contactNo as string,
                remarks: data.remarks as string,
                imageURL: imageUrl,
                dateReported: serverTimestamp(),
                status: 'open',
            };

            if (reportType === 'lost') {
                newReport = {
                    ...newReport,
                    reporterId: user.uid,
                    reporterName: data.name as string,
                    reporterBranch: data.branch as string,
                }
                await addDoc(collection(firestore, 'lost_item_reports'), newReport);
            } else {
                 newReport = {
                    ...newReport,
                    finderId: user.uid,
                    finderName: data.name as string,
                    finderBranch: data.branch as string,
                }
                await addDoc(collection(firestore, 'found_item_reports'), newReport);
            }
            
            setFormSubmitted(true);
        } catch (error) {
            console.error("Error submitting report: ", error);
            toast({ variant: 'destructive', title: 'Submission Failed', description: 'There was an error submitting your report.' });
        } finally {
            setIsSubmitting(false);
        }
    }
    
    const resetForm = () => {
        setIsReportDialogOpen(false);
        setTimeout(() => {
            setFormSubmitted(false);
        }, 300);
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
                                            Your Name
                                        </Label>
                                        <Input id="name" name="name" defaultValue={user?.displayName || ''} className="col-span-3" required />
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
                                        <Label htmlFor="location" className="text-right">
                                            Location
                                        </Label>
                                        <Input id="location" name="location" placeholder="e.g. Library, Cafeteria" className="col-span-3" required />
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
                                    <div className="grid grid-cols-4 items-start gap-4">
                                        <Label htmlFor="remarks" className="text-right pt-2">
                                            Remarks
                                        </Label>
                                        <Textarea id="remarks" name="remarks" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Submit Report
                                    </Button>
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
                        {(isLoadingLost || !lostItems) ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : lostItems.length === 0 ? (
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <p className="text-muted-foreground">No lost items have been reported recently.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {lostItems.map(item => (
                                    <Card key={item.id}>
                                        {item.imageURL && (
                                            <div className="relative h-40 w-full">
                                                <Image src={item.imageURL} alt={item.itemName} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={'item'}/>
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle>{item.itemName}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-2">
                                            <p><span className="font-semibold">Reported by:</span> {item.reporterName}</p>
                                            <p><span className="font-semibold">Branch:</span> {item.reporterBranch}</p>
                                            <p><span className="font-semibold">Lost at:</span> {item.location}</p>
                                            {item.remarks && <p><span className="font-semibold">Remarks:</span> {item.remarks}</p>}
                                        </CardContent>
                                        <CardFooter className="flex-col items-start text-sm">
                                            <p className="font-semibold">Contact Details:</p>
                                            <p>Number: {item.contactNumber}</p>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="found" className="mt-4">
                        {(isLoadingFound || !foundItems) ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : foundItems.length === 0 ? (
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                 <p className="text-muted-foreground">No found items have been reported recently.</p>
                            </div>
                        ) : (
                             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {foundItems.map(item => (
                                    <Card key={item.id}>
                                        {item.imageURL && (
                                            <div className="relative h-40 w-full">
                                                <Image src={item.imageURL} alt={item.itemName} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={'item'} />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle>{item.itemName}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-2">
                                            <p><span className="font-semibold">Found by:</span> {item.finderName}</p>
                                            <p><span className="font-semibold">Branch:</span> {item.finderBranch}</p>
                                            <p><span className="font-semibold">Found at:</span> {item.location}</p>
                                            {item.remarks && <p><span className="font-semibold">Remarks:</span> {item.remarks}</p>}
                                        </CardContent>
                                         <CardFooter className="flex-col items-start text-sm">
                                            <p className="font-semibold">Contact Details:</p>
                                            <p>Number: {item.contactNumber}</p>
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
