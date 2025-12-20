import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MenuItem } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Minus, Plus, PlusCircle } from "lucide-react";

interface MenuCardProps {
    item: MenuItem;
    onAddToCart: (item: MenuItem) => void;
    onRemoveFromCart: (itemId: string) => void;
    quantity: number;
}

export function MenuCard({ item, onAddToCart, onRemoveFromCart, quantity }: MenuCardProps) {
  const itemImage = PlaceHolderImages.find(img => img.id === item.imageId);

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0 relative">
        {itemImage && (
            <Image
                src={itemImage.imageUrl}
                alt={itemImage.description}
                data-ai-hint={itemImage.imageHint}
                width={200}
                height={200}
                className="object-cover w-full h-32 rounded-t-lg"
            />
        )}
        {!item.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                <Badge variant="destructive">Out of Stock</Badge>
            </div>
        )}
      </CardHeader>
      <CardContent className="pt-4 flex-1">
        <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{item.category}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-semibold">₹{item.price.toFixed(0)}</p>
        {quantity > 0 ? (
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onRemoveFromCart(item.id)}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg w-6 text-center">{quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onAddToCart(item)} disabled={!item.inStock}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        ) : (
            <Button size="sm" disabled={!item.inStock} onClick={() => onAddToCart(item)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
