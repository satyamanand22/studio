
import type { Lab, MenuItem, NavItem, ComputerSection } from './types';
import { Home, UtensilsCrossed, Map, Bell, Settings } from 'lucide-react';

export const navItems: NavItem[] = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/cafeteria", icon: UtensilsCrossed, label: "Cafeteria" },
  { href: "/map", icon: Map, label: "Map" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/settings", icon: Settings, label: "Settings" },
];


export const mockLabs: Lab[] = [
  {
    id: 'lab-1',
    name: 'COMPUTER LAB',
    type: 'Lab',
    occupancy: 78,
    totalSeats: 100,
    availableSeats: 22,
    totalComputers: 80,
    availableComputers: 10,
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
  {
    id: 'lab-3',
    name: 'Engineering Study Hub',
    type: 'Lab',
    occupancy: 20,
    totalSeats: 50,
    availableSeats: 40,
    totalComputers: 20,
    availableComputers: 18,
    totalRooms: 5,
    availableRooms: 4,
    imageId: 'lab-3'
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
    {"visitTime": "2023-10-28T12:00:00Z", "duration": 15},
]);

export const mockComputerSections: ComputerSection[] = [
    {
        id: 'section-a',
        name: 'Section A: Computer Lab',
        floor: 1,
        computers: [
            { id: 'c-1-1', name: 'Computer 1', status: 'Occupied', user: 'Alex Doe' },
            { id: 'c-1-2', name: 'Computer 2', status: 'Occupied', user: 'Jane Smith' },
            { id: 'c-1-3', name: 'Computer 3', status: 'Available' },
            { id: 'c-1-4', name: 'Computer 4', status: 'Occupied', user: 'John Doe' },
            { id: 'c-1-5', name: 'Computer 5', status: 'Occupied', user: 'Emily White' },
            { id: 'c-1-6', name: 'Computer 6', status: 'Occupied', user: 'Michael Brown' },
            { id: 'c-1-7', name: 'Computer 7', status: 'Occupied', user: 'Sarah Green' },
            { id: 'c-1-8', name: 'Computer 8', status: 'Available' },
            { id: 'c-1-9', name: 'Computer 9', status: 'Occupied', user: 'David Black' },
            { id: 'c-1-10', name: 'Computer 10', status: 'Available' },
            { id: 'c-1-11', name: 'Computer 11', status: 'Available' },
            { id: 'c-1-12', name: 'Computer 12', status: 'Available' },
            { id: 'c-1-13', name: 'Computer 13', status: 'Occupied', user: 'Laura Blue' },
            { id: 'c-1-14', name: 'Computer 14', status: 'Available' },
            { id: 'c-1-15', name: 'Computer 15', status: 'Available' },
        ]
    }
]
