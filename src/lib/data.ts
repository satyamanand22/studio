
import type { Lab, MenuItem, NavItem, ComputerSection } from './types';
import { Home, UtensilsCrossed, Map, Bell, Settings } from 'lucide-react';

export const navItems: NavItem[] = [
  { href: "/occufind", icon: Home, label: "OccuFind" },
  { href: "/cafeteria", icon: UtensilsCrossed, label: "Cafeteria" },
  { href: "/map", icon: Map, label: "Map" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/settings", icon: Settings, label: "Settings" },
];


export const mockLabs: Lab[] = [
  {
    id: 'lab-1',
    name: 'Main Computer Lab',
    type: 'Lab',
    occupancy: 78,
    totalSeats: 60,
    availableSeats: 13,
    totalComputers: 60,
    availableComputers: 13,
    totalRooms: 0,
    availableRooms: 0,
    imageId: 'lab-1'
  },
  {
    id: 'lab-2',
    name: 'Nalanda Central Library',
    type: 'Library',
    occupancy: 45,
    totalSeats: 300,
    availableSeats: 165,
    totalComputers: 50,
    availableComputers: 25,
    totalRooms: 20,
    availableRooms: 9,
    imageId: 'lab-2'
  },
];

export const mockMenu: MenuItem[] = [
    { id: 'item-1', name: 'Samosa', price: 8, category: 'Snacks', inStock: true, imageId: 'samosa' },
    { id: 'item-2', name: 'Pastry', price: 7, category: 'Desserts', inStock: true, imageId: 'pastry' },
    { id: 'item-3', name: 'Aloo Paratha', price: 13, category: 'Main Course', inStock: true, imageId: 'aloo-paratha' },
    { id: 'item-4', name: 'Tea', price: 4, category: 'Beverages', inStock: true, imageId: 'tea' },
    { id: 'item-5', name: 'Campus Burger', price: 9, category: 'Main Course', inStock: true, imageId: 'burger' },
];

export const swabhimanThali: MenuItem = { id: 'item-6', name: 'Swabhiman Thali', price: 10, category: 'Special', inStock: true, imageId: 'thali' };


export const mockHistoricalCafeteriaData = JSON.stringify([
    {"time": "2023-10-26T12:05:00Z", "orders": 150},
    {"time": "2023-10-26T13:00:00Z", "orders": 250},
    {"time": "2023-10-26T14:00:00Z", "orders": 120},
    {"time": "2023-10-27T12:10:00Z", "orders": 160},
    {"time": "2023-10-27T13:05:00Z", "orders": 260},
]);

export const mockUserHistoricalData = JSON.stringify([
    {"visitTime": "2023-10-26T13:30:00Z", "duration": 25},
    {"visitTime": "2023-10-27T13:45:00Z", "duration": 30},
    {"visitTime": "20Lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
