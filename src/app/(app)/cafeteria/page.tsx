import Image from "next/image";
import { MenuCard } from "@/components/cafeteria/menu-card";
import QueuePrediction from "@/components/cafeteria/queue-prediction";
import TimeRecommendation from "@/components/cafeteria/time-recommendation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockMenu, swabhimanThali } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CafeteriaPage() {
    const thaliImage = PlaceHolderImages.find(img => img.id === swabhimanThali.imageId);
  return (
    <div className="container mx-auto">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="p-6">
                        <CardHeader className="p-0 mb-4">
                            <Badge className="mb-2 w-fit" variant="secondary">Special Menu</Badge>
                            <CardTitle className="text-3xl font-bold">{swabhimanThali.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                           <CardDescription>
                            A wholesome and affordable meal for everyone. Enjoy a balanced plate of traditional Indian dishes.
                           </CardDescription>
                        </CardContent>
                        <CardFooter className="p-0 mt-6 flex justify-between items-center">
                            <p className="text-2xl font-bold">${swabhimanThali.price.toFixed(2)}</p>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add to Order
                            </Button>
                        </CardFooter>
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
                <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">Today's Menu</h2>
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
