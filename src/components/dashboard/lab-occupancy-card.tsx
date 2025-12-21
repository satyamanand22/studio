"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Lab, OccupancyLevel } from "@/lib/types";
import { Armchair, Computer, LocateFixed, Users } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import React from "react";

function getOccupancyLevel(percentage: number): OccupancyLevel {
  if (percentage < 40) return "low";
  if (percentage < 75) return "medium";
  return "high";
}

const levelColors: Record<OccupancyLevel, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

const levelText: Record<OccupancyLevel, string> = {
  low: "text-green-700 dark:text-green-300",
  medium: "text-yellow-700 dark:text-yellow-300",
  high: "text-red-700 dark:text-red-300",
};

interface LabOccupancyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  lab: Lab;
}

export function LabOccupancyCard({ lab, className, ...props }: LabOccupancyCardProps) {
  const { toast } = useToast();
  const level = getOccupancyLevel(lab.occupancy);
  const labImage = PlaceHolderImages.find((img) => img.id === lab.imageId);

  const handleNotifyClick = () => {
    toast({
      title: "Notification Set",
      description: "We will notify you shortly when space is available.",
    });
  };

  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            {labImage && (
                <Image
                    src={labImage.imageUrl}
                    alt={labImage.description}
                    data-ai-hint={labImage.imageHint}
                    fill
                    className="object-cover rounded-t-lg"
                />
            )}
            <div className="absolute top-2 right-2">
                <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize text-white",
                    levelColors[level]
                )}>
                    {level}
                </span>
            </div>
        </div>
        <div className="p-6 pb-2">
            <CardTitle>{lab.name}</CardTitle>
            <CardDescription>{lab.type}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 grid gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Overall Occupancy</span>
            <span className={cn("text-sm font-bold", levelText[level])}>{lab.occupancy}%</span>
          </div>
          <Progress value={lab.occupancy} aria-label={`${lab.occupancy}% occupied`} />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <Armchair className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="text-lg font-bold">{lab.availableSeats}</p>
                <p className="text-xs text-muted-foreground">Seats</p>
            </div>
            <div>
                <Computer className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="text-lg font-bold">{lab.availableComputers}</p>
                <p className="text-xs text-muted-foreground">Computers</p>
            </div>
            <div>
                <Users className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="text-lg font-bold">{lab.availableRooms}</p>
                <p className="text-xs text-muted-foreground">Rooms</p>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="w-full" onClick={handleNotifyClick}>Notify Me</Button>
        <Button variant="secondary" className="w-full">
            <LocateFixed className="mr-2 h-4 w-4" />
            Find on map
        </Button>
      </CardFooter>
    </Card>
  );
}
