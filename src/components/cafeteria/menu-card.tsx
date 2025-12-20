import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MenuItem } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

export function MenuCard({ item }: { item: MenuItem }) {
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
        <p className="font-semibold">${item.price.toFixed(2)}</p>
        <Button size="sm" disabled={!item.inStock}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
        </Button>
      </CardFooter>
    </Card>
  );
}
