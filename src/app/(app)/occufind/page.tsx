
'use client';

import { ComputerAvailabilityGrid } from '@/components/nalanda/computer-availability-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OccuFindPage() {
  return (
    <div className="container mx-auto space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline mb-4">Ground Floor</h1>
        <ComputerAvailabilityGrid floor={1} />
       </div>

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
