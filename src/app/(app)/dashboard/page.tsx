import { LabOccupancyCard } from "@/components/dashboard/lab-occupancy-card";
import { mockLabs } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockLabs.map((lab) => (
          <LabOccupancyCard key={lab.id} lab={lab} />
        ))}
      </div>
    </div>
  );
}
