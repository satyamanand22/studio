
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
};

const statusDotStyles = {
    Available: 'bg-green-500',
    Occupied: 'bg-red-500',
}

export function ComputerCard({ computer, onUpdate }: ComputerCardProps) {
    const { user } = useAuth();
    
    const handleRelease = () => {
        onUpdate({ ...computer, status: 'Available', user: undefined });
    };

    const isCurrentUser = user && user.displayName === computer.user;

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
                     {computer.user && (
                         <p className="truncate flex items-center gap-1">
                           <User className="h-3 w-3" /> {computer.user}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-2 border-t h-[44px]">
                <div className="w-full">
                    {computer.status === 'Available' && (
                        null
                    )}
                    {computer.status === 'Occupied' && isCurrentUser && (
                        <div className="flex gap-2">
                            <Button size="sm" variant="destructive" className="w-full" onClick={handleRelease}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Release
                            </Button>
                        </div>
                    )}
                    {computer.status === 'Occupied' && !isCurrentUser && (
                        <p className="text-xs text-center text-muted-foreground">MARK AS AWAY</p>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
