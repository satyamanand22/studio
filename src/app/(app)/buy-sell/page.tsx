
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, PlusCircle, Search, ShoppingBag, Package, Phone, User, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface SellItem {
    id: string;
    itemName: string;
    description: string;
    price: string;
    imageId: string;
    sellerName: string;
    department: string;
    sellerContact: string;
    image?: string;
}

const mockSellItems: SellItem[] = [
    {
        id: 'sell-1',
        itemName: 'Used Engineering Textbook',
        description: 'First year engineering textbook, in good condition with minor highlights.',
        price: '500',
        imageId: 'used-textbook',
        sellerName: 'Rohan Sharma',
        department: 'Mechanical',
        sellerContact: '9876543210'
    },
    {
        id: 'sell-2',
        itemName: 'Watch',
        description: 'A stylish and reliable watch. Barely used.',
        price: '350',
        imageId: 'drafter-set',
        sellerName: 'Priya Singh',
        department: 'Civil',
        sellerContact: '8765432109'
    },
    {
        id: 'sell-3',
        itemName: 'Bicycle',
        description: 'A reliable bicycle perfect for getting around campus. Recently serviced.',
        price: '2500',
        imageId: 'bicycle',
        sellerName: 'Amit Patel',
        department: 'CSE',
        sellerContact: '7654321098'
    },
];

export default function BuyAndSellPage() {
    const [availableItems, setAvailableItems] = useState<SellItem[]>(mockSellItems);
    const [activeTab, setActiveTab] = useState('available');
    const { toast } = useToast();

    const handleSellItem = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
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

        const newItem: SellItem = {
            id: `item-${Date.now()}`,
            itemName: data.itemName as string,
            description: data.description as string,
            price: data.price as string,
            image: imageUrl,
            imageId: `item-image-${Date.now()}`, // Temporary fallback
            sellerName: data.sellerName as string,
            department: data.department as string,
            sellerContact: data.sellerContact as string,
        };

        setAvailableItems(prev => [newItem, ...prev]);
        
        toast({
            title: "Item Listed!",
            description: `${newItem.itemName} is now available for sale.`,
        });

        form.reset();
        setActiveTab('available');
    };

  return (
    <div className="container mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Buy and Sell</CardTitle>
                <CardDescription>A marketplace for students to buy and sell items.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="available">
                            <List className="mr-2 h-4 w-4" />
                            Available Items
                        </TabsTrigger>
                        <TabsTrigger value="sell">
                            <Package className="mr-2 h-4 w-4" />
                            Sell Item
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="available" className="mt-4">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search for items..."
                                className="pl-10 w-full"
                            />
                        </div>
                        {availableItems.length === 0 ? (
                             <div className="h-[60vh] border-2 border-dashed border-border rounded-lg flex items-center justify-center flex-col gap-4">
                                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                <p className="text-muted-foreground">No items for sale yet. Be the first to sell!</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {availableItems.map(item => {
                                    const itemImage = PlaceHolderImages.find(img => img.id === item.imageId);
                                    const imageUrl = item.image || itemImage?.imageUrl;
                                    const imageHint = itemImage?.imageHint || 'product';

                                    return (
                                        <Card key={item.id} className="flex flex-col">
                                            {imageUrl && (
                                                <div className="relative h-48 w-full">
                                                    <Image src={imageUrl} alt={item.itemName} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={imageHint} />
                                                </div>
                                            )}
                                            <CardHeader>
                                                <CardTitle>{item.itemName}</CardTitle>
                                                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1 space-y-4">
                                                <div>
                                                    <p className="text-2xl font-bold">₹{item.price}</p>
                                                </div>
                                                <div className="text-sm text-muted-foreground space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <span>{item.sellerName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Building className="h-4 w-4" />
                                                        <span>{item.department}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full">
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    Contact Seller
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    )
                                })}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="sell" className="mt-4">
                         <Card>
                            <CardHeader>
                                <CardTitle>Post Your Item for Sale</CardTitle>
                                <CardDescription>Fill out the form below to list your item on the marketplace.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <form onSubmit={handleSellItem} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="itemName">Item Name</Label>
                                        <Input id="itemName" name="itemName" placeholder="e.g., Engineering Graphics Book" required />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea id="description" name="description" placeholder="Provide details about the item's condition, edition, etc." required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price (₹)</Label>
                                            <Input id="price" name="price" type="number" placeholder="e.g., 250" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="image">Image</Label>
                                            <Input id="image" name="image" type="file" accept="image/*" />
                                        </div>
                                    </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="sellerName">Seller Name</Label>
                                            <Input id="sellerName" name="sellerName" placeholder="e.g., Alex Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="department">Department and Branch</Label>
                                            <Input id="department" name="department" placeholder="e.g., CSE" required />
                                        </div>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="sellerContact">Contact Number</Label>
                                        <Input 
                                            id="sellerContact" 
                                            name="sellerContact" 
                                            type="tel"
                                            pattern="[0-9]{10}"
                                            maxLength={10}
                                            placeholder="e.g., 9876543210" 
                                            required 
                                            onInput={(e) => {
                                                const target = e.target as HTMLInputElement;
                                                target.value = target.value.replace(/[^0-9]/g, '');
                                            }}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Post Item
                                    </Button>
                                </form>
                            </CardContent>
                         </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );

    

    
}
    