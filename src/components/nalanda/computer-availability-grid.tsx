
'use client';

import { mockComputerSections } from "@/lib/data";
import { ComputerSection } from "@/lib/types";
import { LayoutGrid } from "lucide-react";
import { ComputerCard } from "./computer-card";
import { useState } from "react";
import type { Computer as ComputerType } from "@/lib/types";

interface ComputerAvailabilityGridProps {
    floor: number;
}

export function ComputerAvailabilityGrid({ floor }: ComputerAvailabilityGridProps) {
    const sections = mockComputerSections.filter(section => section.floor === floor);
    const [computers, setComputers] = useState<ComputerType[]>(sections.flatMap(s => s.computers));

    const handleUpdateComputer = (updatedComputer: ComputerType) => {
        setComputers(prevComputers => prevComputers.map(c => c.id === updatedComputer.id ? updatedComputer : c));
    }

    if (sections.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No computer sections found for this floor.</p>;
    }

    return (
        <div className="space-y-6">
            {sections.map(section => {
                const sectionComputers = computers.filter(c => mockComputerSections.find(s => s.id === section.id)?.computers.some(comp => comp.id === c.id));
                return (
                    <div key={section.id}>
                        <div className="flex items-center gap-2 mb-4">
                            <LayoutGrid className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-semibold">{section.name} ({section.computers.length} computers)</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {sectionComputers.map(computer => (
                                <ComputerCard key={computer.id} computer={computer} onUpdate={handleUpdateComputer} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

