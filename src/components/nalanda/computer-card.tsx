
'use client';

import { useState, useEffect } from 'react';
import type { Computer as ComputerType } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Computer as ComputerIcon, User, LogOut, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

interface ComputerCardProps {
    computer: ComputerType;
    onUpdate: (computer: ComputerType) => void;
}

const statusStyles = {
    Available: 'bg-yellow-300 text-yellow-800 border-yellow-400 dark:bg-yellow-700 dark:text-yellow-100 dark:border-yellow-600',
    Occupied: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
    Away: 'bg-purple-500 text-purple-100 border-purple-600 dark:bg-purple-700 dark:text-purple-100 dark:border-purple-600'
};

const statusDotStyles = {
    Available: 'bg-green-500',
    Occupied: 'bg-red-500',
    Away: 'bg-purple-400'
}

export function ComputerCard({ computer, onUpdate }: ComputerCardProps) {
    const { user } = useAuth();
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
                    onUpdate({ ...computer, status: 'Available', user: undefined, awayUntil: undefined });
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

    
    const handleOccupy = () => {
        if (!user) return;
        onUpdate({ ...computer, status: 'Occupied', user: user.displayName || 'Unnamed User' });
    };

    const handleRelease = () => {
        onUpdate({ ...computer, status: 'Available', user: undefined, awayUntil: undefined });
    };

    const handleMarkAway = () => {
        // Sets a 10-minute timer
        const awayUntil = Date.now() + 10 * 60 * 1000;
        onUpdate({ ...computer, status: 'Away', awayUntil });
    };

    const isCurrentUser = user && user.displayName === computer.user;
    
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
                    <ComputerIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                 <div className="text-xs text-muted-foreground space-y-1">
                    <Badge variant="outline" className={cn('w-full justify-center', statusStyles[computer.status])}>
                         <span className={cn(
                            "h-2 w-2 rounded-full mr-2", 
                            statusDotStyles[computer.status],
                            (computer.status === 'Available' || computer.status === 'Occupied') && 'animate-pulse'
                         )}></span>
                        {computer.status}
                    </Badge>
                     {computer.user && computer.status !== 'Away' && (
                         <p className="truncate flex items-center gap-1">
                           <User className="h-3 w-3" /> {computer.user}
                        </p>
                    )}
                     {computer.status === 'Away' && timer !== null && (
                         <p className="truncate flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 justify-center">
                           <Clock className="h-3 w-3" /> Back in: {formatTime(timer)}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-2 border-t h-[44px]">
                <div className="w-full">
                    {computer.status === 'Available' && (
                        <Button size="sm" className="w-full" onClick={handleOccupy}>
                            Occupy
                        </Button>
                    )}
                    {computer.status === 'Occupied' && isCurrentUser && (
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="w-full" onClick={handleMarkAway}>
                                <Clock className="mr-2 h-4 w-4" />
                                Mark Away
                            </Button>
                             <Button size="sm" variant="destructive" className="w-full" onClick={handleRelease}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Release
                            </Button>
                        </div>
                    )}
                    {computer.status === 'Occupied' && !isCurrentUser && (
                        <Button variant="ghost" size="sm" className="w-full text-xs text-center text-muted-foreground" onClick={handleMarkAway}>
                           MARK AS AWAY
                        </Button>
                    )}
                    {computer.status === 'Away' && (
                         <p className="text-xs text-center text-muted-foreground">User is temporarily away.</p>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
