
'use client';

import { useState } from 'react';
import { ComputerAvailabilityGrid } from '@/components/nalanda/computer-availability-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BookCheck, BookX, Copy, Library, Search, ChevronDown, Trophy, Play, BarChart, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function OccuFindPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<{ available: boolean; rack?: number; floor?: number, copies?: number } | null>(null);
  const { toast } = useToast();
  const [isComputerGridOpen, setIsComputerGridOpen] = useState(false);
  const [isLeagueDialogOpen, setIsLeagueDialogOpen] = useState(false);
  const [leagueFormSubmitted, setLeagueFormSubmitted] = useState(false);

  const handleBookSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        variant: 'destructive',
        title: 'Search field is empty',
        description: 'Please enter a book title, author, or ISBN.',
      });
      setSearchResult(null);
      return;
    }
    
    // Simulate finding a book
    const isAvailable = Math.random() < 0.7; // 70% chance of being available
    if (isAvailable) {
        const randomRack = Math.floor(Math.random() * 50) + 1; // Racks 1-50
        const randomFloor = Math.floor(Math.random() * 2) + 1; // Floor 1 or 2
        const randomCopies = Math.floor(Math.random() * 5) + 1; // 1-5 copies
        setSearchResult({ available: true, rack: randomRack, floor: randomFloor, copies: randomCopies });
    } else {
        setSearchResult({ available: false });
    }
  };

  const handleLeagueSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeagueFormSubmitted(true);
    // In a real app, you would handle form submission here
    toast({
        title: "Registration Successful!",
        description: "You are now part of the Library Champions League."
    });
  }

  const resetLeagueForm = () => {
    setIsLeagueDialogOpen(false);
    setTimeout(() => {
       setLeagueFormSubmitted(false);
    }, 300); // Delay to allow dialog to close smoothly
  }


  return (
    <div className="container mx-auto space-y-8">
       <Card>
        <Collapsible
            open={isComputerGridOpen}
            onOpenChange={setIsComputerGridOpen}
          >
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Computer Room</CardTitle>
              <CardDescription>Ground Floor Availability (Section A - 21 PCs)</CardDescription>
            </div>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  <span className="sr-only">Toggle</span>
                </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <ComputerAvailabilityGrid floor={1} />
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
       </Card>

        <Card>
            <CardHeader>
                <CardTitle>Search for Books</CardTitle>
                <CardDescription>Find where your book is located in the Nalanda Library.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search by book title, author, or ISBN..."
                            className="pl-10 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleBookSearch();
                                }
                            }}
                        />
                    </div>
                    <Button onClick={handleBookSearch}>Search</Button>
                </div>

                {searchResult && searchResult.available && (
                    <Card className="bg-secondary animate-fade-in-up">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <BookCheck className="h-6 w-6 text-primary" />
                                Book Location Found
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-3xl font-bold">{searchResult.floor}</p>
                                    <p className="text-sm text-muted-foreground">Floor No.</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{searchResult.rack}</p>
                                    <p className="text-sm text-muted-foreground">Rack No.</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{searchResult.copies}</p>
                                    <p className="text-sm text-muted-foreground">Available Copies</p>
                                </div>
                           </div>
                        </CardContent>
                    </Card>
                )}
                 {searchResult && !searchResult.available && (
                     <Card className="bg-destructive/10 border-destructive/50 animate-fade-in-up">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2 text-destructive">
                                <BookX className="h-6 w-6" />
                                Book Unavailable
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-destructive-foreground">This book is currently unavailable.</p>
                            <Button variant="link" className="mt-2 text-destructive-foreground" onClick={() => toast({ title: "Notification set!", description: "We'll notify you when the book is available."})}>
                                Notify me when it is available
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Library Champions League</CardTitle>
                        <CardDescription>Compete with fellow students and win exciting prizes!</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                 <Dialog open={isLeagueDialogOpen} onOpenChange={(open) => {
                    setIsLeagueDialogOpen(open);
                    if (!open) {
                        setTimeout(() => setLeagueFormSubmitted(false), 300);
                    }
                 }}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Play className="mr-2" />
                            Participate Now
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        {!leagueFormSubmitted ? (
                             <form onSubmit={handleLeagueSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Register for Library Champions League</DialogTitle>
                                    <DialogDescription>Fill in your details to participate.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-6">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="league-name" className="text-right">Name</Label>
                                        <Input id="league-name" name="name" className="col-span-3" required />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="league-department" className="text-right">Department</Label>
                                        <Input id="league-department" name="department" className="col-span-3" required />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="league-branch" className="text-right">Branch</Label>
                                        <Input id="league-branch" name="branch" className="col-span-3" required />
                                    </div>
                                     <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="league-enrollment" className="text-right">Enrollment No.</Label>
                                        <Input id="league-enrollment" name="enrollmentNo" className="col-span-3" required />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="league-card" className="text-right">Library Card No.</Label>
                                        <Input id="league-card" name="libraryCardNo" className="col-span-3" required />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit Registration</Button>
                                </DialogFooter>
                            </form>
                        ) : (
                             <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                                <Check className="h-12 w-12 text-green-500" />
                                <h3 className="text-xl font-bold">Registration Submitted!</h3>
                                <p className="text-muted-foreground">Thank you for participating. Best of luck!</p>
                                <Button onClick={resetLeagueForm} className="mt-4">Close</Button>
                            </div>
                        )}
                    </DialogContent>
                 </Dialog>
                <Button variant="secondary" className="w-full" onClick={() => toast({ title: "Results Soon!", description: "Results for the previous league will be announced shortly."})}>
                    <BarChart className="mr-2" />
                    Check Results
                </Button>
            </CardContent>
        </Card>

       <Card>
        <CardHeader className="flex-row items-center gap-4">
            <Library className="h-8 w-8 text-primary" />
            <div>
                 <CardTitle>Library Rules & Regulations</CardTitle>
                 <CardDescription>Important guidelines for all library users.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>A valid library card is required to be worn at all times to read books within the library premises.</li>
                <li>A valid library card must be presented to issue any book.</li>
                <li>A fine of ₹50 per day will be charged for late submission of books.</li>
            </ul>
        </CardContent>
       </Card>
    </div>
  );
}
