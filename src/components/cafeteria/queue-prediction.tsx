
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
import { PredictCafeteriaQueueLengthOutput } from "@/ai/flows/predict-cafeteria-queue-length";
import { Loader2, Timer, Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { cn } from "@/lib/utils";

const analysisLevels = ["very short", "short", "moderate", "long", "very long"];

export default function QueuePrediction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [prediction, setPrediction] = useState<PredictCafeteriaQueueLengthOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderVolume, setOrderVolume] = useState([50]);
  const { toast } = useToast();

  const getPrediction = async () => {
    setLoading(true);
    setPrediction(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const queueLength = Math.floor(orderVolume[0] / 5) + Math.floor(Math.random() * 5);
        const waitingTime = queueLength * 3;
        const analysisIndex = Math.min(Math.floor(queueLength / 5), analysisLevels.length - 1);
        
        const result = {
            queueLength,
            waitingTime,
            analysis: analysisLevels[analysisIndex],
        };

        setPrediction(result);
    } catch(e) {
        toast({
            variant: "destructive",
            title: "Prediction Failed",
            description: "Could not generate a queue prediction at this time."
        })
    }
    setLoading(false);
  };

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Cafeteria Queue Prediction</CardTitle>
        <CardDescription>
          Estimate wait times before you go.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="order-volume">Simulated Real-time Orders: {orderVolume[0]}</Label>
            <Slider
                id="order-volume"
                min={0}
                max={300}
                step={10}
                value={orderVolume}
                onValueChange={setOrderVolume}
                disabled={loading}
            />
        </div>
        {loading && (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        {prediction && (
          <div className="p-4 bg-secondary rounded-lg space-y-4">
             <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <Users className="mx-auto h-6 w-6 text-primary" />
                    <p className="text-2xl font-bold">{prediction.queueLength}</p>
                    <p className="text-xs text-muted-foreground">People in Queue</p>
                </div>
                <div>
                    <Timer className="mx-auto h-6 w-6 text-primary" />
                    <p className="text-2xl font-bold">{prediction.waitingTime} min</p>
                    <p className="text-xs text-muted-foreground">Est. Wait Time</p>
                </div>
            </div>
             <p className="text-sm text-center font-medium capitalize p-2 bg-background rounded-md">
                Analysis: <span className="text-primary">{prediction.analysis}</span>
             </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={getPrediction} disabled={loading} className="w-full">
          {loading ? "Analyzing..." : "Predict Queue"}
        </Button>
      </CardFooter>
    </Card>
  );
}
