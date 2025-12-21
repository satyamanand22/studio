import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";

export default function MapPage() {
  return (
    <div className="container mx-auto space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Lost and Found</CardTitle>
                <CardDescription>
                    Lost something? Or found something that belongs to someone else? Report it here.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Found Items
                </Button>
                <Button variant="secondary" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Report a Lost Item
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
