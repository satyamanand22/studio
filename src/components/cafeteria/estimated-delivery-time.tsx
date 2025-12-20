
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { predictCafeteriaQueueLength, PredictCafeteriaQueueLengthOutput } from "@/ai/flows/predict-cafeteria-queue-length";
import { mockHistoricalCafeteriaData } from "@/lib/data";
import { Loader2, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EstimatedDeliveryTimeProps {
    orderVolume: number;
}

export default function EstimatedDeliveryTime({ orderVolume }: EstimatedDeliveryTimeProps) {
  const [prediction, setPrediction] = useState<PredictCafeteriaQueueLengthOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getPrediction = async () => {
        if (orderVolume === 0) {
            setPrediction(null);
            return;
        }
      setLoading(true);
      try {
          const result = await predictCafeteriaQueueLength({
              currentTime: new Date().toISOString(),
              historicalOrderData: mockHistoricalCafeteriaData,
              realTimeOrderVolume: orderVolume,
          });
          setPrediction(result);
      } catch(e) {
          toast({
              variant: "destructive",
              title: "Estimation Failed",
              description: "Could not estimate delivery time."
          })
      }
      setLoading(false);
    };

    const timer = setTimeout(() => {
        getPrediction();
    }, 500); // Debounce the prediction

    return () => clearTimeout(timer);
  }, [orderVolume, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estimated Delivery Time</CardTitle>
        <CardDescription>
          An estimate of when your order will be ready.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : prediction ? (
          <div className="p-4 bg-secondary rounded-lg space-y-4">
             <div className="flex flex-col items-center gap-2 text-center">
                <Timer className="mx-auto h-6 w-6 text-primary" />
                <p className="text-3xl font-bold">{prediction.waitingTime} min</p>
                <p className="text-sm text-muted-foreground">Estimated Wait</p>
            </div>
          </div>
        ) : (
            <div className="text-center text-muted-foreground p-4">
                Add items to see an estimate.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
