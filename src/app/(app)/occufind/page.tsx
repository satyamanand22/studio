
'use client';

import { ComputerAvailabilityGrid } from '@/components/nalanda/computer-availability-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function OccuFindPage() {
  return (
    <div className="container mx-auto space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline mb-4">Ground Floor</h1>
        <ComputerAvailabilityGrid floor={1} />
       </div>

        <Card>
            <CardHeader>
                <CardTitle>Search for Books</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by book title, author, or ISBN..."
                        className="pl-10 w-full"
                    />
                </div>
                <Button>Search</Button>
            </CardContent>
        </Card>

       <Card>
        <CardHeader>
          <CardTitle>Library Rules & Regulations</CardTitle>
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
