
'use client';

import { useState } from 'react';
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
import { Star, ThumbsUp } from "lucide-react";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ratingCategories = [
    { id: 'quality', label: 'Quality of Food' },
    { id: 'timing', label: 'Time Management' },
    { id: 'behavior', label: 'Behavior of Mess Vendors' },
    { id: 'cleaning', label: 'Cleanliness' },
    { id: 'menu', label: 'Menu Rating' },
];

type Ratings = {
    [key: string]: number;
}

export default function MessRatingPage() {
    const [step, setStep] = useState(1);
    const [selectedHostel, setSelectedHostel] = useState('');
    const [ratings, setRatings] = useState<Ratings>({
        quality: 0,
        timing: 0,
        behavior: 0,
        cleaning: 0,
        menu: 0
    });
    const { toast } = useToast();

    const handleProceed = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedHostel) {
            toast({
                variant: 'destructive',
                title: 'Please select a hostel',
                description: 'You must select a hostel to proceed.',
            });
            return;
        }
        setStep(2);
    }

    const handleRating = (category: string, value: number) => {
        setRatings(prev => ({ ...prev, [category]: value }));
    }

    const handleSubmitRating = () => {
        console.log('Submitted Ratings:', ratings);
        toast({
            title: 'Rating Submitted!',
            description: `Thank you for rating the ${selectedHostel} mess.`,
        });
        setStep(1);
        setSelectedHostel('');
        setRatings({ quality: 0, timing: 0, behavior: 0, cleaning: 0, menu: 0 });
    }

  return (
    <div className="container mx-auto max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle>Mess Rating System</CardTitle>
                <CardDescription>Rate your daily mess food and see what others think.</CardDescription>
            </CardHeader>
            <CardContent>
                {step === 1 ? (
                    <form onSubmit={handleProceed} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="hostel-id">Unique ID of Hostel</Label>
                            <Input id="hostel-id" placeholder="Enter your hostel's unique ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hostel-select">Select Hostel</Label>
                            <Select onValueChange={setSelectedHostel} value={selectedHostel}>
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
                ) : (
                    <div className="space-y-8">
                        {ratingCategories.map(category => (
                             <div key={category.id} className="space-y-3">
                                <Label className="text-base">{category.label}</Label>
                                <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                    key={star}
                                    className={cn(
                                        "h-8 w-8 cursor-pointer transition-colors",
                                        star <= ratings[category.id]
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    )}
                                    onClick={() => handleRating(category.id, star)}
                                    />
                                ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between gap-4">
                            <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                                Back
                            </Button>
                            <Button onClick={handleSubmitRating} className="w-full">
                                Submit Rating
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
