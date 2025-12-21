
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Alex Doe" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex.doe@example.com" />
                    </div>
                    <Button>Update Profile</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage your API keys for third-party services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="gemini-api-key">Gemini API Key</Label>
                        <Input id="gemini-api-key" type="password" placeholder="Enter your Google AI API Key" />
                        <p className="text-xs text-muted-foreground">
                            Your API key is stored securely and used for AI-powered features.
                        </p>
                    </div>
                    <Button>Save API Key</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Choose what you want to be notified about.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="space-notify">Free Study Space</Label>
                            <p className="text-sm text-muted-foreground">Get alerts when a spot opens up in your favorite labs.</p>
                        </div>
                        <Switch id="space-notify" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="order-notify">Order Ready</Label>
                             <p className="text-sm text-muted-foreground">Know exactly when your cafeteria order is ready for pickup.</p>
                        </div>
                        <Switch id="order-notify" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="crowd-notify">Low Crowd Times</Label>
                             <p className="text-sm text-muted-foreground">Receive suggestions for the best times to visit the cafeteria.</p>
                        </div>
                        <Switch id="crowd-notify" />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
