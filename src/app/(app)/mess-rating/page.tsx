
'use client';

import { useState, useMemo } from 'react';
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
import { Star, ThumbsUp, BarChart2 } from "lucide-react";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

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

// Mock data for overall results
const mockResults = {
    'swami-vivekanand': { quality: 4.2, timing: 3.8, behavior: 4.5, cleaning: 4.1, menu: 3.9, totalRatings: 120 },
    'shaheed-veer-narayan-singh': { quality: 3.9, timing: 4.1, behavior: 4.0, cleaning: 3.8, menu: 3.5, totalRatings: 95 },
    'dr-br-ambedkar': { quality: 4.5, timing: 4.4, behavior: 4.7, cleaning: 4.6, menu: 4.3, totalRatings: 150 },
    'veer-savarkar': { quality: 3.5, timing: 3.2, behavior: 3.8, cleaning: 3.4, menu: 3.1, totalRatings: 80 },
    'raj-mohini-devi': { quality: 4.8, timing: 4.5, behavior: 4.9, cleaning: 4.7, menu: 4.6, totalRatings: 200 },
    'minimata': { quality: 4.1, timing: 4.0, behavior: 4.2, cleaning: 4.3, menu: 4.0, totalRatings: 110 },
    'bilasa-devi': { quality: 4.3, timing: 4.1, behavior: 4.4, cleaning: 4.5, menu: 4.2, totalRatings: 130 },
};

const hostelNames: { [key: string]: string } = {
    'swami-vivekanand': "Swami Vivekanand (Boys')",
    'shaheed-veer-narayan-singh': "Shaheed Veer Narayan Singh (Boys')",
    'dr-br-ambedkar': "Dr. B. R. Ambedkar (Boys')",
    'veer-savarkar': "Veer Savarkar (Boys')",
    'raj-mohini-devi': "Raj Mohini Devi (Girls')",
    'minimata': "Minimata (Girls')",
    'bilasa-devi': "Bilasa Devi (Girls')",
};

export default function MessRatingPage() {
    const [view, setView] = useState<'form' | 'results'>('form');
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
        // Here you would typically send the data to your backend
        toast({
            title: 'Rating Submitted!',
            description: `Thank you for rating the ${hostelNames[selectedHostel]} mess.`,
        });
        setStep(1);
        setSelectedHostel('');
        setRatings({ quality: 0, timing: 0, behavior: 0, cleaning: 0, menu: 0 });
    }

    const overallAverages = useMemo(() => {
        return Object.entries(mockResults).map(([hostelId, data]) => {
            const avg = (data.quality + data.timing + data.behavior + data.cleaning + data.menu) / 5;
            return {
                id: hostelId,
                name: hostelNames[hostelId],
                average: parseFloat(avg.toFixed(1)),
                totalRatings: data.totalRatings
            };
        });
    }, []);

  return (
    <div className="container mx-auto max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle>Mess Rating System</CardTitle>
                <CardDescription>
                    {view === 'form' 
                        ? 'Rate your daily mess food and see what others think.'
                        : "Overall mess ratings based on student feedback. The result announced monthly on the last working day of every month."
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                {view === 'form' ? (
                    step === 1 ? (
                        <div className="space-y-4">
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
                                            {Object.entries(hostelNames).map(([id, name]) => (
                                                <SelectItem key={id} value={id}>{name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full">
                                    <ThumbsUp className="mr-2 h-4 w-4" />
                                    Proceed to Rating
                                </Button>
                            </form>
                            <Button variant="outline" className="w-full" onClick={() => setView('results')}>
                                <BarChart2 className="mr-2 h-4 w-4" />
                                View Final Results
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <h3 className="text-lg font-semibold text-center">Rating for {hostelNames[selectedHostel]}</h3>
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
                            <div className="flex justify-between gap-4 pt-4">
                                <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                                    Back
                                </Button>
                                <Button onClick={handleSubmitRating} className="w-full">
                                    Submit Rating
                                </Button>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="space-y-6">
                        <div className='space-y-4'>
                            {overallAverages.sort((a, b) => b.average - a.average).map(result => (
                                <div key={result.id}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">{result.name}</span>
                                        <span className="text-sm font-bold text-primary">{result.average}/5</span>
                                    </div>
                                    <Progress value={result.average * 20} aria-label={`${result.average} out of 5 stars`} />
                                    <p className="text-xs text-muted-foreground mt-1">{result.totalRatings} ratings</p>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => setView('form')}>
                            Back to Rating
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
