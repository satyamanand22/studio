import type { Lab, MenuItem, NavItem, ComputerSection } from './types';
import { BookOpen, UtensilsCrossed, Map, Bell, Settings } from 'lucide-react';

export const navItems: NavItem[] = [
  { href: "/occufind", icon: BookOpen, label: "OccuFind" },
  { href: "/cafeteria", icon: UtensilsCrossed, label: "Cafeteria" },
  { href: "/map", icon: Map, label: "Map" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/settings", icon: Settings, label: "Settings" },
];


export const mockLabs: Lab[] = [];

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
            { id: 'pc-04', name: 'PC-04', status: 'Available' },
            { id: 'pc-05', name: 'PC-05', status: 'Available' },
            { id: 'pc-06', name: 'PC-06', status: 'Available' },
            { id: 'pc-07', name: 'PC-07', status: 'Occupied', user: 'Sam Wilson' },
            { id: 'pc-08', name: 'PC-08', status: 'Available' },
            { id: 'pc-09', name: 'PC-09', status: 'Available' },
            { id: 'pc-10', name: 'PC-10', status: 'Available' },
            { id: 'pc-11', name: 'PC-11', status: 'Available' },
            { id: 'pc-12', name: 'PC-12', status: 'Occupied', user: 'Chris Evans' },
            { id: 'pc-13', name: 'PC-13', status: 'Available' },
            { id: 'pc-14', name: 'PC-14', status: 'Available' },
            { id: 'pc-15', name: 'PC-15', status: 'Occupied', user: 'Tony Stark' },
            { id: 'pc-16', name: 'PC-16', status: 'Available' },
            { id: 'pc-17', name: 'PC-17', status: 'Available' },
            { id: 'pc-18', name: 'PC-18', status: 'Available' },
            { id: 'pc-19', name: 'PC-19', status: 'Available' },
            { id: 'pc-20', name: 'PC-20', status: 'Available' },
            { id: 'pc-21', name: 'PC-21', status: 'Occupied', user: 'Bruce Banner' },
        ],
    },
    {
        id: 'section-b',
        name: 'Section B',
        floor: 1,
        computers: [
            { id: 'pc-22', name: 'PC-22', status: 'Occupied', user: 'Alice' },
            { id: 'pc-23', name: 'PC-23', status: 'Available' },
            { id: 'pc-24', name: 'PC-24', status: 'Available' },
            { id: 'pc-25', name: 'PC-25', status: 'Occupied', user: 'Bob' },
            { id: 'pc-26', name: 'PC-26', status: 'Available' },
        ],
    }
]
