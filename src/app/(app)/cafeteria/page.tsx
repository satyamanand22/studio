
"use client";

import Image from "next/image";
import { MenuCard } from "@/components/cafeteria/menu-card";
import QueuePrediction from "@/components/cafeteria/queue-prediction";
import TimeRecommendation from "@/components/cafeteria/time-recommendation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { mockMenu, swabhimanThali } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Minus, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCounter } from "@/hooks/use-counter";
import { GooglePayIcon } from "@/components/icons/google-pay";

export default function CafeteriaPage() {
  const thaliImage = PlaceHolderImages.find(
    (img) => img.id === swabhimanThali.imageId
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const { count, increment, decrement, setCount } = useCounter(1);
  const [orderStep, setOrderStep] = useState<"form" | "processing" | "confirmed">("form");
  const { toast } = useToast();

  const handleOrder = async () => {
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Name is required",
        description: "Please enter your name to proceed.",
      });
      return;
    }
    setOrderStep("processing");
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOrderStep("confirmed");
  };

  const resetOrderProcess = () => {
    setName("");
    setCount(1);
    setOrderStep("form");
    setIsDialogOpen(false);
  }

  return (
    <div className="container mx-auto">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 flex flex-col">
                <CardHeader className="p-0 mb-4">
                  <Badge className="mb-2 w-fit" variant="secondary">
                    Special Menu
                  </Badge>
                  <CardTitle className="text-3xl font-bold">
                    {swabhimanThali.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <CardDescription>
                    A wholesome and affordable meal for everyone. Enjoy a
                    balanced plate of traditional Indian dishes.
                  </CardDescription>
                </CardContent>
                <div className="p-0 mt-6 flex justify-between items-center">
                  <p className="text-2xl font-bold">
                    ₹{swabhimanThali.price.toFixed(2)}
                  </p>
                  <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) {
                      // Reset state when dialog is closed at any step
                      resetOrderProcess();
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add to Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Order Swabhiman Thali</DialogTitle>
                      </DialogHeader>
                      {orderStep === 'form' && (
                         <div className="grid gap-6 py-4">
                           <div className="space-y-2">
                            <h3 className="font-medium">{swabhimanThali.name}</h3>
                            <p className="text-sm text-muted-foreground">Availability: <span className="text-green-600 font-semibold">{swabhimanThali.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
                           </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="col-span-3"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                              Quantity
                            </Label>
                            <div className="col-span-3 flex items-center gap-2">
                               <Button variant="outline" size="icon" className="h-8 w-8" onClick={decrement} disabled={count <= 1}>
                                <Minus className="h-4 w-4" />
                               </Button>
                               <span className="font-bold text-lg w-8 text-center">{count}</span>
                               <Button variant="outline" size="icon" className="h-8 w-8" onClick={increment} disabled={count >= 10}>
                                 <Plus className="h-4 w-4" />
                               </Button>
                            </div>
                          </div>
                          <div className="text-right font-bold text-xl">
                            Total: ₹{(swabhimanThali.price * count).toFixed(2)}
                          </div>
                          <Button onClick={handleOrder} className="w-full" disabled={!swabhimanThali.inStock}>
                            <GooglePayIcon className="mr-2 h-6 w-6" />
                            Pay with Google Pay
                          </Button>
                        </div>
                      )}
                      {orderStep === 'processing' && (
                        <div className="flex flex-col items-center justify-center gap-4 py-10">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-muted-foreground">Processing payment...</p>
                        </div>
                      )}
                       {orderStep === 'confirmed' && (
                        <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <h3 className="text-xl font-bold">Order Confirmed!</h3>
                            <p className="text-muted-foreground">Thank you, {name}.<br/>Your order for {count} thali(s) has been placed.</p>
                            <Button onClick={resetOrderProcess} className="mt-4">
                              Close
                            </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              {thaliImage && (
                <div className="relative min-h-[200px] md:min-h-0">
                  <Image
                    src={thaliImage.imageUrl}
                    alt={thaliImage.description}
                    data-ai-hint={thaliImage.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </Card>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">
              Today's Menu
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {mockMenu.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <QueuePrediction />
          <Separator />
          <TimeRecommendation />
        </div>
      </div>
    </div>
  );
}
