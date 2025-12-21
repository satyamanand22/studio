"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { recommendCafeteriaTimes, RecommendCafeteriaTimesOutput } from "@/ai/flows/recommend-cafeteria-times";
import { mockUserHistoricalData } from "@/lib/data";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { cn } from "@/lib/utils";

export default function TimeRecommendation({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [recommendation, setRecommendation] = useState<RecommendCafeteriaTimesOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getRecommendation = async () => {
    setLoading(true);
    setRecommendation(null);
    try {
        const result = await recommendCafeteriaTimes({
            currentTime: new Date().toISOString(),
            userHistoricalData: mockUserHistoricalData,
        });
        setRecommendation(result);
    } catch(e) {
        toast({
            variant: "destructive",
            title: "Recommendation Failed",
            description: "Could not generate recommendations at this time."
        })
    }
    setLoading(false);
  };

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
        <CardDescription>
          Find the best time for you to visit the cafeteria.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        {recommendation && (
          <div className="p-4 bg-secondary rounded-lg space-y-2 text-sm">
             <p className="font-bold text-primary">{recommendation.recommendedTimes}</p>
             <p className="text-muted-foreground">{recommendation.reasoning}</p>
          </div>
        )}
        {!recommendation && !loading && (
            <div className="text-center text-muted-foreground p-4">
                Click the button to get your personalized times.
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={getRecommendation} disabled={loading} className="w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Finding Best Times..." : "Get Recommended Times"}
        </Button>
      </CardFooter>
    </Card>
  );
}
