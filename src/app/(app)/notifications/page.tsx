import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Your recent alerts and updates will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="h-[60vh] border-2 border-dashed border-border rounded-lg flex items-center justify-center flex-col gap-4">
                <BellRing className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No new notifications.</p>
            </CardContent>
        </Card>
    </div>
  );
}
