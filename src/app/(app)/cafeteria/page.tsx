
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { mockMenu, swabhimanThali } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Download, Loader2, Minus, Plus, PlusCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCounter } from "@/hooks/use-counter";
import { GooglePayIcon } from "@/components/icons/google-pay";
import jsPDF from "jspdf";
import "jspdf-autotable";
import type { MenuItem } from "@/lib/types";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

type OrderItem = MenuItem & { quantity: number };


export default function CafeteriaPage() {
  const thaliImage = PlaceHolderImages.find(
    (img) => img.id === swabhimanThali.imageId
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const { count, increment, decrement, setCount } = useCounter(1);
  const [orderStep, setOrderStep] = useState<"form" | "processing" | "confirmed">("form");
  const { toast } = useToast();

  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);


  const handleAddToCart = (item: MenuItem) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        toast({
          title: "Added to order",
          description: `${item.name} has been added to your order.`,
        });
        return [...prevOrder, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevOrder.map((orderItem) =>
          orderItem.id === itemId
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        );
      } else {
        return prevOrder.filter((orderItem) => orderItem.id !== itemId);
      }
    });
  };

  const orderTotal = order.reduce((total, item) => total + item.price * item.quantity, 0);


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

  const handleDownloadBill = () => {
    const doc = new jsPDF();
    const totalAmount = swabhimanThali.price * count;
    const gst = totalAmount * 0.05; // 5% GST
    const finalAmount = totalAmount + gst;

    doc.setFontSize(20);
    doc.text("GGV PULSE - Order Invoice", 14, 22);
    doc.setFontSize(12);
    doc.text(`Student Name: ${name}`, 14, 32);
    doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 14, 39);

    doc.autoTable({
      startY: 50,
      head: [['Item', 'Quantity', 'Price']],
      body: [
        [swabhimanThali.name, count, `₹${swabhimanThali.price.toFixed(2)}`],
      ],
      theme: 'grid',
    });

    const finalY = (doc as any).lastAutoTable.finalY || 70;

    doc.setFontSize(10);
    doc.text(`Subtotal: ₹${totalAmount.toFixed(2)}`, 14, finalY + 10);
    doc.text(`GST (5%): ₹${gst.toFixed(2)}`, 14, finalY + 15);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Payment: ₹${finalAmount.toFixed(2)}`, 14, finalY + 22);

    doc.save(`invoice-${name.replace(" ", "-").toLowerCase()}-${Date.now()}.pdf`);
  }

  const resetOrderProcess = () => {
    setName("");
    setCount(1);
    setOrderStep("form");
    setIsDialogOpen(false);
  }

  const resetGeneralOrder = () => {
    setOrder([]);
    setIsOrderSummaryOpen(false);
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
                            <div className="flex gap-2 mt-4">
                              <Button onClick={handleDownloadBill}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Bill
                              </Button>
                              <Button onClick={resetOrderProcess} variant="secondary">
                                Close
                              </Button>
                            </div>
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
              University Cafeteria
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {mockMenu.map((item) => {
                const orderItem = order.find(o => o.id === item.id);
                const quantity = orderItem ? orderItem.quantity : 0;
                return (
                  <MenuCard 
                    key={item.id} 
                    item={item} 
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    quantity={quantity}
                  />
                )
              })}
            </div>
             <div className="mt-8 flex justify-center">
                <Dialog open={isOrderSummaryOpen} onOpenChange={setIsOrderSummaryOpen}>
                    <DialogTrigger asChild>
                         <Button size="lg" disabled={order.length === 0}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Submit Order ({order.reduce((acc, item) => acc + item.quantity, 0)})
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Your Order</DialogTitle>
                            <DialogDescription>
                                Review your items before submitting your order.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[300px] overflow-y-auto pr-4">
                            {order.length > 0 ? (
                                <div className="space-y-4">
                                    {order.map(item => (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                 <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleRemoveFromCart(item.id)}>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="font-bold text-md w-6 text-center">{item.quantity}</span>
                                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleAddToCart(item)}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
                            )}
                        </div>
                        {order.length > 0 && (
                             <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Total</p>
                                    <p>₹{orderTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsOrderSummaryOpen(false)}>Cancel</Button>
                            <Button onClick={() => {
                                toast({ title: "Order Submitted!", description: "Your order has been sent to the cafeteria." });
                                resetGeneralOrder();
                            }} disabled={order.length === 0}>
                                Confirm Order
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
