
'use client';

import { useState, useEffect } from 'react';
import type { Computer as ComputerType } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Computer as ComputerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

interface ComputerCardProps {
    computer: ComputerType;
    onUpdate: (computer: ComputerType) => void;
}

const statusStyles = {
    Available: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
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
    const isCurrentUser = computer.status === 'Occupied' && computer.user === user?.displayName;

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


    const handleMarkAsAway = () => {
        const awayDuration = 15 * 60 * 1000; // 15 minutes
        onUpdate({
            ...computer,
            status: 'Away',
            awayUntil: Date.now() + awayDuration
        });
    }

    const handleReturn = () => {
        onUpdate({ ...computer, status: 'Occupied', awayUntil: undefined });
    }

    const handleTakeComputer = () => {
        if (user) {
            onUpdate({ ...computer, status: 'Occupied', user: user.displayName! });
        }
    }

    const handleReleaseComputer = () => {
        onUpdate({ ...computer, status: 'Available', user: undefined });
    }

    return (
        <Card className="flex flex-col">
            <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-sm">{computer.name}</p>
                    <ComputerIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                {computer.status === 'Available' ? (
                     <Badge variant="outline" className={cn('w-full justify-center', statusStyles.Available)}>
                        <span className={cn("h-2 w-2 rounded-full mr-2", statusDotStyles.Available)}></span>
                        Available
                    </Badge>
                ) : (
                    <div className="text-xs text-muted-foreground space-y-1">
                        <Badge variant="outline" className={cn('w-full justify-center', statusStyles[computer.status])}>
                             <span className={cn("h-2 w-2 rounded-full mr-2", statusDotStyles[computer.status])}></span>
                            {computer.status}
                        </Badge>
                        <p className="truncate">
                           User: {computer.user}
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-2 bg-secondary/50 dark:bg-background">
                {computer.status === 'Available' && (
                    <Button size="sm" className="w-full" onClick={handleTakeComputer} disabled={!user}>
                        Occupy
                    </Button>
                )}
                {isCurrentUser && computer.status === 'Occupied' && (
                    <div className="w-full space-y-1">
                        <Button size="sm" variant="secondary" className="w-full" onClick={handleMarkAsAway}>
                            Mark as Away (15 min)
                        </Button>
                         <Button size="sm" variant="destructive" className="w-full" onClick={handleReleaseComputer}>
                            Release
                        </Button>
                    </div>
                )}
                 {isCurrentUser && computer.status === 'Away' && (
                    <Button size="sm" className="w-full" onClick={handleReturn}>
                        Return ({timeLeft} min left)
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
