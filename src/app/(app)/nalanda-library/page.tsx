
'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Armchair,
  BookOpen,
  Clock,
  Computer,
  LocateFixed,
  Users,
} from 'lucide-react';
import { mockLabs } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OccupancyLevel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function getOccupancyLevel(percentage: number): OccupancyLevel {
  if (percentage < 40) return 'low';
  if (percentage < 75) return 'medium';
  return 'high';
}

const levelColors: Record<OccupancyLevel, string> = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

const levelText: Record<OccupancyLevel, string> = {
  low: 'text-green-700 dark:text-green-300',
  medium: 'text-yellow-700 dark:text-yellow-300',
  high: 'text-red-700 dark:text-red-300',
};

export default function NalandaLibraryPage() {
  const router = useRouter();
  const libraryData = mockLabs.find(
    (lab) => lab.name === 'Nalanda Central Library'
  );
  const libraryImage = PlaceHolderImages.find(
    (img) => img.id === libraryData?.imageId
  );
  const floorPlanImage = PlaceHolderImages.find(
    (img) => img.id === 'library-floor-plan'
  );

  if (!libraryData || !libraryImage) {
    return (
      <div className="container mx-auto text-center py-10">
        Library data not found.
      </div>
    );
  }

  const level = getOccupancyLevel(libraryData.occupancy);

  return (
    <div className="container mx-auto space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={libraryImage.imageUrl}
            alt={libraryImage.description}
            data-ai-hint={libraryImage.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold font-headline text-foreground">
              {libraryData.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Your central hub for knowledge and study.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Live Occupancy</CardTitle>
              <CardDescription>
                Real-time status of available resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">
                    Overall Occupancy
                  </span>
                  <span className={cn('text-sm font-bold', levelText[level])}>
                    {libraryData.occupancy}%
                  </span>
                </div>
                <Progress
                  value={libraryData.occupancy}
                  aria-label={`${libraryData.occupancy}% occupied`}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-secondary rounded-lg">
                  <Armchair className="mx-auto h-8 w-8 text-primary" />
                  <p className="text-2xl font-bold mt-2">
                    {libraryData.availableSeats}
                  </p>
                  <p className="text-sm text-muted-foreground">Seats</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <Computer className="mx-auto h-8 w-8 text-primary" />
                  <p className="text-2xl font-bold mt-2">
                    {libraryData.availableComputers}
                  </p>
                  <p className="text-sm text-muted-foreground">Computers</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <Users className="mx-auto h-8 w-8 text-primary" />
                  <p className="text-2xl font-bold mt-2">
                    {libraryData.availableRooms}
                  </p>
                  <p className="text-sm text-muted-foreground">Study Rooms</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Floor Plan & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="floor1">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="floor1">1st Floor</TabsTrigger>
                  <TabsTrigger value="floor2">2nd Floor</TabsTrigger>
                  <TabsTrigger value="floor3">3rd Floor</TabsTrigger>
                </TabsList>
                <TabsContent value="floor1" className="mt-4">
                  <p className="text-muted-foreground mb-4">
                    Circulation desk, new arrivals, and general reading area.
                  </p>
                  {floorPlanImage && (
                    <Image
                      src={floorPlanImage.imageUrl}
                      alt="Floor plan for 1st floor"
                      width={800}
                      height={600}
                      className="rounded-lg border"
                    />
                  )}
                </TabsContent>
                <TabsContent value="floor2" className="mt-4">
                  <p className="text-muted-foreground">
                    Reference section, journals, and quiet study zones.
                  </p>
                </TabsContent>
                <TabsContent value="floor3" className="mt-4">
                  <p className="text-muted-foreground">
                    Digital library, computer labs, and group study rooms.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <h4 className="font-semibold">Timings</h4>
                  <p className="text-muted-foreground">9:00 AM - 8:00 PM</p>
                  <p className="text-xs text-muted-foreground">(Mon-Sat)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <h4 className="font-semibold">Services</h4>
                  <p className="text-muted-foreground">
                    Book Lending, Digital Resources, Printing & Scanning
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            size="lg"
            className="w-full"
            onClick={() => router.push('/map')}
          >
            <LocateFixed className="mr-2 h-5 w-5" />
            Find on Map
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
