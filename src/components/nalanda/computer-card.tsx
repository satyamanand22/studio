
'use client';

import { useState, useEffect } from 'react';
import type { Computer as ComputerType } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Monitor, Clock, Undo2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComputerCardProps {
    computer: ComputerType;
    onUpdate: (computer: ComputerType) => void;
}

const statusStyles = {
    Available: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
    Occupied: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
    Away: 'bg-purple-600 text-white border-purple-700 dark:bg-purple-800 dark:text-purple-100 dark:border-purple-600'
};

const statusDotStyles = {
    Available: 'bg-green-500',
    Occupied: 'bg-red-500',
    Away: 'bg-purple-500'
}

export function ComputerCard({ computer, onUpdate }: ComputerCardProps) {
    const [timer, setTimer] = useState<number | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (computer.status === 'Away' && computer.awayUntil) {
            const updateTimer = () => {
                const now = Date.now();
                const timeLeft = Math.round((computer.awayUntil! - now) / 1000);
                if (timeLeft > 0) {
                    setTimer(timeLeft);
                } else {
                    setTimer(null);
                    onUpdate({ ...computer, status: 'Available', awayUntil: undefined });
                    clearInterval(interval);
                }
            };

            updateTimer(); // Initial call
            interval = setInterval(updateTimer, 1000);
        } else {
            setTimer(null);
        }

        return () => clearInterval(interval);
    }, [computer, onUpdate]);

    
    const handleMarkAway = () => {
        const awayUntil = Date.now() + 10 * 60 * 1000;
        onUpdate({ ...computer, status: 'Away', awayUntil });
    };

    const handleImBack = () => {
        onUpdate({ ...computer, status: 'Occupied', awayUntil: undefined });
    };
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <Card className="flex flex-col">
            <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-sm">{computer.name}</p>
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                </div>
                 <div className="text-xs text-muted-foreground space-y-1">
                    <Badge variant="outline" className={cn('w-full justify-center', statusStyles[computer.status])}>
                         <span className={cn(
                            "h-2 w-2 rounded-full mr-2", 
                            statusDotStyles[computer.status],
                            computer.status === 'Available' && 'animate-pulse'
                         )}></span>
                        {computer.status}
                    </Badge>
                     {computer.status === 'Away' && timer !== null && (
                         <p className="truncate flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 justify-center">
                           <Clock className="h-3 w-3" /> Back in: {formatTime(timer)}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-2 border-t h-[44px]">
                 <div className="w-full">
                    {computer.status === 'Occupied' && (
                         <Button variant="ghost" size="sm" className="w-full text-xs text-center bg-purple-600 text-white hover:bg-purple-700" onClick={handleMarkAway}>
                            MARK AS AWAY
                        </Button>
                    )}
                    {computer.status === 'Away' && (
                        <Button variant="outline" size="sm" className="w-full text-xs" onClick={handleImBack}>
                            <Undo2 className="mr-2 h-3 w-3" />
                            I'm Back
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
