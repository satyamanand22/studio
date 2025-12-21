
'use client';

import { ComputerAvailabilityGrid } from '@/components/nalanda/computer-availability-grid';

export default function OccuFindPage() {
  return (
    <div className="container mx-auto space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline mb-4">Ground Floor</h1>
        <ComputerAvailabilityGrid floor={1} />
       </div>
    </div>
  );
}
