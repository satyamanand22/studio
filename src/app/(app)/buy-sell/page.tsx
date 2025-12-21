
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, PlusCircle, Search, ShoppingBag, Package } from 'lucide-react';

export default function BuyAndSellPage() {
    const [availableItems, setAvailableItems] = useState<any[]>([]);

    const handleSellItem = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle item submission logic here
    };

  return (
    <div className="container mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Buy and Sell</CardTitle>
                <CardDescription>A marketplace for students to buy and sell items.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="available">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="available">
                            <List className="mr-2 h-4 w-4" />
                            Available Items
                        </TabsTrigger>
                        <TabsTrigger value="sell">
                            <Package className="mr-2 h-4 w-4" />
                            Sell Items
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
                                {/* Items will be mapped here */}
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
