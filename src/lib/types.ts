import { LucideIcon } from "lucide-react";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'student' | 'admin';
}

export type OccupancyLevel = 'low' | 'medium' | 'high';

export interface Lab {
  id: string;
  name: string;
  type: 'Lab' | 'Library';
  occupancy: number; // percentage
  totalSeats: number;
  availableSeats: number;
  totalComputers: number;
  availableComputers: number;
  totalRooms: number;
  availableRooms: number;
  imageId: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  imageId: string;
}

export interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

export type ComputerStatus = 'Available' | 'Occupied' | 'Away';

export interface Computer {
  id: string;
  name: string;
  status: ComputerStatus;
  user?: string;
  awayUntil?: number; // Timestamp
}

export interface ComputerSection {
    id: string;
    name: string;
    floor: number;
    computers: Computer[];
}
