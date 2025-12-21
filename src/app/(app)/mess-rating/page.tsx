
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function MessRatingPage() {
  return (
    <div className="container mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Mess Rating System</CardTitle>
                <CardDescription>Rate your daily mess food and see what others think.</CardDescription>
            </CardHeader>
            <CardContent className="h-[60vh] border-2 border-dashed border-border rounded-lg flex items-center justify-center flex-col gap-4">
                <Star className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">This feature is coming soon!</p>
            </CardContent>
        </Card>
    </div>
  );
}
