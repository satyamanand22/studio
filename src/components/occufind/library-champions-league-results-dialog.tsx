
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BarChart, Trophy, Award } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockLeagueParticipants } from '@/lib/data';

interface Participant {
    rank: number;
    name: string;
    department: string;
    branch: string;
}

export function LibraryChampionsLeagueResultsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const topParticipants = useMemo(() => {
    // In a real app, this would be fetched data. Here we generate it.
    const participants: Participant[] = [];
    for (let i = 1; i <= 30; i++) {
        const randomParticipant = mockLeagueParticipants[Math.floor(Math.random() * mockLeagueParticipants.length)];
        participants.push({
            rank: i,
            name: randomParticipant.name,
            department: randomParticipant.department,
            branch: randomParticipant.branch
        });
    }
    return participants;
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Award className="h-5 w-5 text-slate-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="font-mono text-sm w-5 text-center">{rank}</span>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">
                <BarChart className="mr-2" />
                Check Results
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Library Champions League Results</DialogTitle>
                <DialogDescription>Top 30 participants for this month.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-72">
                <div className="pr-6">
                   <ul className="space-y-4">
                        {topParticipants.map(participant => (
                             <li key={participant.rank} className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-6">{getRankIcon(participant.rank)}</div>
                                <div>
                                    <p className="font-semibold">{participant.name}</p>
                                    <p className="text-xs text-muted-foreground">{participant.department} - {participant.branch}</p>
                                </div>
                            </li>
                        ))}
                   </ul>
                </div>
            </ScrollArea>
             <DialogFooter>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
