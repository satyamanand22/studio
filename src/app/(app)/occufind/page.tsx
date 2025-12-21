import { LabOccupancyCard } from "@/components/dashboard/lab-occupancy-card";
import { mockLabs } from "@/lib/data";

export default function OccuFindPage() {
  return (
    <div className="container mx-auto">
      {mockLabs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockLabs.map((lab, index) => (
            <LabOccupancyCard
              key={lab.id}
              lab={lab}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold font-headline mb-2">No Labs to Display</h2>
            <p className="text-muted-foreground">There are currently no labs or libraries to show. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
