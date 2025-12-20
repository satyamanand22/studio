import type { Lab, MenuItem } from './types';

export const mockLabs: Lab[] = [
  {
    id: 'lab-1',
    name: 'Main Computer Lab',
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
    { id: 'item-1', name: 'Campus Burger', price: 8.99, category: 'Main Course', inStock: true, imageId: 'burger' },
    { id: 'item-2', name: 'Pepperoni Pizza', price: 10.50, category: 'Main Course', inStock: true, imageId: 'pizza' },
    { id: 'item-3', name: 'Garden Salad', price: 6.50, category: 'Salads', inStock: false, imageId: 'salad' },
    { id: 'item-4', name: 'Sushi Combo', price: 12.99, category: 'Specials', inStock: true, imageId: 'sushi' },
    { id: 'item-5', name: 'Artisan Coffee', price: 3.50, category: 'Beverages', inStock: true, imageId: 'coffee' },
];

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
