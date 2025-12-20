import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MapPage() {
  return (
    <div className="container mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Campus Map</CardTitle>
            </CardHeader>
            <CardContent className="h-[60vh] bg-muted rounded-lg flex items-center justify-center flex-col gap-4">
                <p className="text-muted-foreground">Map integration coming soon.</p>
                <Button>Find Nearest Free Lab</Button>
            </CardContent>
        </Card>
    </div>
  );
}
