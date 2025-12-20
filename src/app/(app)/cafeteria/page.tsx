import { MenuCard } from "@/components/cafeteria/menu-card";
import QueuePrediction from "@/components/cafeteria/queue-prediction";
import TimeRecommendation from "@/components/cafeteria/time-recommendation";
import { Separator } from "@/components/ui/separator";
import { mockMenu } from "@/lib/data";

export default function CafeteriaPage() {
  return (
    <div className="container mx-auto">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">Today's Menu</h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {mockMenu.map((item) => (
                    <MenuCard key={item.id} item={item} />
                ))}
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
