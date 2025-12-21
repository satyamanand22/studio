
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThumbsUp } from "lucide-react";

export default function MessRatingPage() {
  return (
    <div className="container mx-auto max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle>Mess Rating System</CardTitle>
                <CardDescription>Rate your daily mess food and see what others think.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="hostel-id">Unique ID of Hostel</Label>
                        <Input id="hostel-id" placeholder="Enter your hostel's unique ID" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hostel-select">Select Hostel</Label>
                         <Select>
                            <SelectTrigger id="hostel-select">
                                <SelectValue placeholder="Select your hostel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="swami-vivekanand">Swami Vivekanand (Boys')</SelectItem>
                                <SelectItem value="shaheed-veer-narayan-singh">Shaheed Veer Narayan Singh (Boys')</SelectItem>
                                <SelectItem value="dr-br-ambedkar">Dr. B. R. Ambedkar (Boys')</SelectItem>
                                <SelectItem value="veer-savarkar">Veer Savarkar (Boys')</SelectItem>
                                <SelectItem value="raj-mohini-devi">Raj Mohini Devi (Girls')</SelectItem>
                                <SelectItem value="minimata">Minimata (Girls')</SelectItem>
                                <SelectItem value="bilasa-devi">Bilasa Devi (Girls')</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Proceed to Rating
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
