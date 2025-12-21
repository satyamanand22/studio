
'use client';

import { useState, useEffect } from 'react';
import type { Computer as ComputerType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Computer as ComputerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

interface ComputerCardProps {
    computer: ComputerType;
    onUpdate: (computer: ComputerType) => void;
}

const statusStyles = {
    Available: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
    Occupied: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
    Away: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
};

const statusDotStyles = {
    Available: 'bg-green-500',
    Occupied: 'bg-red-500',
    Away: 'bg-yellow-500',
}

export function ComputerCard({ computer, onUpdate }: ComputerCardProps) {
    const { user } = useAuth();
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        if (computer.status === 'Away' && computer.awayUntil) {
            const updateTimer = () => {
                const now = Date.now();
                const remaining = Math.max(0, computer.awayUntil! - now);
                setTimeLeft(Math.ceil(remaining / 1000 / 60));
                if (remaining === 0) {
                    onUpdate({ ...computer, status: 'Available', user: undefined, awayUntil: undefined });
                }
            };
            
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        } else {
            setTimeLeft(null);
        }
    }, [computer, onUpdate]);


    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-sm">{computer.name}</p>
                    <ComputerIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                 <div className="text-xs text-muted-foreground space-y-1">
                    <Badge variant="outline" className={cn('w-full justify-center', statusStyles[computer.status])}>
                         <span className={cn("h-2 w-2 rounded-full mr-2", statusDotStyles[computer.status])}></span>
                        {computer.status}
                    </Badge>
                    {computer.user && (
                         <p className="truncate">
                           User: {computer.user}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

