
"use client";

import Image from "next/image";
import { MenuCard } from "@/components/cafeteria/menu-card";
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
import QRCode from "qrcode";
import type { MenuItem } from "@/lib/types";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

type OrderItem = MenuItem & { quantity: number };

type GeneralOrderStep = "summary" | "payment" | "processing" | "confirmed";


export default function CafeteriaPage() {
  const thaliImage = PlaceHolderImages.find(
    (img) => img.id === swabhimanThali.imageId
  );
  const [isThaliDialogOpen, setIsThaliDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const { count, increment, decrement, setCount } = useCounter(1);
  const [thaliOrderStep, setThaliOrderStep] = useState<"form" | "processing" | "confirmed">("form");
  const { toast } = useToast();

  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [generalOrderStep, setGeneralOrderStep] = useState<GeneralOrderStep>("summary");
  const [transactionId, setTransactionId] = useState("");


  const handleAddToCart = (item: MenuItem) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    
    if (!existingItem) {
      toast({
        title: "Added to order",
        description: `${item.name} has been added to your order.`,
      });
    }

    setOrder((prevOrder) => {
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
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


  const handleThaliOrder = async () => {
    if (!studentName.trim()) {
      toast({
        variant: "destructive",
        title: "Name is required",
        description: "Please enter your name to proceed.",
      });
      return;
    }
    setThaliOrderStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setThaliOrderStep("confirmed");
  };

  const handleGeneralOrder = async () => {
    if (!studentName.trim()) {
      toast({
        variant: "destructive",
        title: "Name is required",
        description: "Please enter your name to proceed.",
      });
      return;
    }
    setGeneralOrderStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTransactionId(`TXN${Date.now()}`);
    setGeneralOrderStep("confirmed");
  };

  const generateAndDownloadBill = async (orderItems: OrderItem[], name: string, total: number, currentTransactionId?: string) => {
    const doc = new jsPDF();
    const gst = total * 0.05; // 5% GST
    const finalAmount = total + gst;
    const orderId = Math.floor(10000 + Math.random() * 90000);

    doc.setFontSize(20);
    doc.text("GGV PULSE - Order Invoice", 14, 22);
    doc.setFontSize(12);
    doc.text(`Student Name: ${name}`, 14, 32);
    doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 14, 39);
    doc.text(`Order ID: #${orderId}`, 14, 46);

    const tableBody = orderItems.map(item => [
        item.name,
        item.quantity,
        `₹${item.price.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 55,
      head: [['Item', 'Quantity', 'Unit Price']],
      body: tableBody,
      theme: 'grid',
    });

    const finalY = (doc as any).lastAutoTable.finalY || 70;

    doc.setFontSize(10);
    doc.text(`Subtotal: ₹${total.toFixed(2)}`, 14, finalY + 10);
    doc.text(`GST (5%): ₹${gst.toFixed(2)}`, 14, finalY + 15);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Payment: ₹${finalAmount.toFixed(2)}`, 14, finalY + 22);
    
    if(currentTransactionId) {
        doc.text(`Transaction ID: ${currentTransactionId}`, 14, finalY + 29)
    }

    try {
        const qrData = JSON.stringify({
            orderId: `#${orderId}`,
            studentName: name,
            totalAmount: `₹${finalAmount.toFixed(2)}`,
            transactionId: currentTransactionId || "N/A"
        });
        const qrCodeDataURL = await QRCode.toDataURL(qrData, { width: 200, margin: 2 });
        doc.addImage(qrCodeDataURL, 'PNG', 150, finalY + 8, 45, 45);
        doc.setFontSize(8)
        doc.text("Scan for details", 160, finalY + 56);
    } catch (err) {
        console.error("Failed to generate QR code", err);
    }

    doc.save(`invoice-${name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.pdf`);
  }

  const resetThaliOrderProcess = () => {
    setStudentName("");
    setCount(1);
    setThaliOrderStep("form");
    setIsThaliDialogOpen(false);
  }

  const resetGeneralOrder = () => {
    setOrder([]);
    setStudentName("");
    setTransactionId("");
    setGeneralOrderStep("summary");
    setIsOrderSummaryOpen(false);
  }

  return (
    <div className="container mx-auto">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
                  <Dialog open={isThaliDialogOpen} onOpenChange={(open) => {
                    setIsThaliDialogOpen(open);
                    if (!open) {
                      resetThaliOrderProcess();
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
                      {thaliOrderStep === 'form' && (
                         <div className="grid gap-6 py-4">
                           <div className="space-y-2">
                            <h3 className="font-medium">{swabhimanThali.name}</h3>
                            <p className="text-sm text-muted-foreground">Availability: <span className="text-green-600 font-semibold">{swabhimanThali.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
                           </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name-thali" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name-thali"
                              value={studentName}
                              onChange={(e) => setStudentName(e.target.value)}
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
                          <Button onClick={handleThaliOrder} className="w-full" disabled={!swabhimanThali.inStock}>
                            <GooglePayIcon className="mr-2 h-6 w-6" />
                            Pay with Google Pay
                          </Button>
                        </div>
                      )}
                      {thaliOrderStep === 'processing' && (
                        <div className="flex flex-col items-center justify-center gap-4 py-10">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-muted-foreground">Processing payment...</p>
                        </div>
                      )}
                       {thaliOrderStep === 'confirmed' && (
                        <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <h3 className="text-xl font-bold">Order Confirmed!</h3>
                            <p className="text-muted-foreground">Thank you, {studentName}.<br/>Your order for {count} thali(s) has been placed.</p>
                            <div className="flex gap-2 mt-4">
                              <Button onClick={() => generateAndDownloadBill([{...swabhimanThali, quantity: count}], studentName, swabhimanThali.price * count)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Bill
                              </Button>
                              <Button onClick={resetThaliOrderProcess} variant="secondary">
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

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">
              University Cafeteria
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {mockMenu.map((item, index) => {
                const orderItem = order.find(o => o.id === item.id);
                const quantity = orderItem ? orderItem.quantity : 0;
                return (
                  <MenuCard 
                    key={item.id} 
                    item={item} 
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    quantity={quantity}
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                    className="animate-fade-in-up"
                  />
                )
              })}
            </div>
             <div className="mt-8 flex justify-center">
                <Dialog open={isOrderSummaryOpen} onOpenChange={(open) => {
                    setIsOrderSummaryOpen(open);
                    if (!open) {
                      resetGeneralOrder();
                    }
                  }}>
                    <DialogTrigger asChild>
                         <Button size="lg" disabled={order.length === 0}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Submit Order ({order.reduce((acc, item) => acc + item.quantity, 0)})
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      {generalOrderStep === 'summary' && (
                        <>
                          <DialogHeader>
                              <DialogTitle>Your Order</DialogTitle>
                              <DialogDescription>
                                  Review your items before proceeding to payment.
                              </DialogDescription>
                          </DialogHeader>
                          <div className="max-h-[300px] overflow-y-auto pr-4 my-4">
                              {order.length > 0 ? (
                                  <div className="space-y-4">
                                      {order.map(item => (
                                          <div key={item.id} className="flex justify-between items-center">
                                              <div>
                                                  <p className="font-semibold">{item.name}</p>
                                                  <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} x {item.quantity}</p>
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
                          <DialogFooter className="mt-4">
                              <Button variant="secondary" onClick={() => setIsOrderSummaryOpen(false)}>Cancel</Button>
                              <Button onClick={() => setGeneralOrderStep("payment")} disabled={order.length === 0}>
                                  Proceed to Payment
                              </Button>
                          </DialogFooter>
                        </>
                      )}
                      {generalOrderStep === 'payment' && (
                        <div className="grid gap-6 py-4">
                            <DialogHeader>
                                <DialogTitle>Complete Your Order</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name-general" className="text-right">
                                Name
                                </Label>
                                <Input
                                id="name-general"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter your name"
                                />
                            </div>
                            <div className="text-right font-bold text-xl">
                                Total: ₹{orderTotal.toFixed(2)}
                            </div>
                            <Button onClick={handleGeneralOrder} className="w-full">
                                <GooglePayIcon className="mr-2 h-6 w-6" />
                                Pay with Google Pay
                            </Button>
                             <Button variant="link" size="sm" className="text-muted-foreground" onClick={() => setGeneralOrderStep("summary")}>
                                Go back to summary
                            </Button>
                        </div>
                      )}
                       {generalOrderStep === 'processing' && (
                        <div className="flex flex-col items-center justify-center gap-4 py-10">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-muted-foreground">Processing payment...</p>
                        </div>
                      )}
                       {generalOrderStep === 'confirmed' && (
                        <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <h3 className="text-xl font-bold">Order Confirmed!</h3>
                            <p className="text-muted-foreground">Thank you, {studentName}.<br/>Your order has been placed.</p>
                            <p className="text-xs text-muted-foreground mt-2">Transaction ID: {transactionId}</p>
                            <div className="flex gap-2 mt-4">
                              <Button onClick={() => generateAndDownloadBill(order, studentName, orderTotal, transactionId)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Bill
                              </Button>
                              <Button onClick={resetGeneralOrder} variant="secondary">
                                Close
                              </Button>
                            </div>
                        </div>
                      )}
                    </DialogContent>
                </Dialog>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <TimeRecommendation className="animate-fade-in-up" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>
    </div>
  );
}
