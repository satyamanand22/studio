
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
    {"visitTime": "2023-10-28T13:00:00Z", "duration": 20}
]);

export const mockComputerSections: ComputerSection[] = [
    {
        id: 'section-a',
        name: 'Section A',
        floor: 1,
        computers: [
            { id: 'pc-01', name: 'PC-01', status: 'Available' },
            { id: 'pc-02', name: 'PC-02', status: 'Occupied', user: 'Jane Doe' },
            { id: 'pc-03', name: 'PC-03', status: 'Available' },
            { id: 'pc-04', name: 'PC-04', status: 'Away', user: 'John Smith', awayUntil: Date.now() + 10 * 60 * 1000 },
            { id: 'pc-05', name: 'PC-05', status: 'Available' },
        ],
    },
    {
        id: 'section-b',
        name: 'Section B',
        floor: 1,
        computers: [
            { id: 'pc-06', name: 'PC-06', status: 'Occupied', user: 'Alice' },
            { id: 'pc-07', name: 'PC-07', status: 'Available' },
            { id: 'pc-08', name: 'PC-08', status: 'Available' },
            { id: 'pc-09', name: 'PC-09', status: 'Occupied', user: 'Bob' },
            { id: 'pc-10', name: 'PC-10', status: 'Available' },
        ],
    }
]
