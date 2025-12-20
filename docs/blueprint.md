# **App Name**: CampusPulse

## Core Features:

- Secure Authentication: Firebase Authentication with Email/Password and Google Sign-In for Students and Admins, using role-based access control with Firebase Custom Claims.
- Real-Time Lab Occupancy: Live availability of study rooms, computers, and seats sourced from IoT sensors or Wi-Fi device count, displayed with green/yellow/red occupancy indicators.
- Smart Cafeteria System: Pre-order meals, schedule order times, see recommended order times (low-rush periods). Tracks food availability and reduces lunch break waiting time and food wastage.
- Queue Length Prediction: Predicts cafeteria queue length & waiting time using historical order data and real-time order volume.
- Free Space Finder: Option to 'Find nearest free lab'.
- Real-Time Updates: Provide push notifications when study rooms become available using real-time data from the Firestore database.
- Personalized Recommendations Tool: AI-powered Firebase Cloud Function tool which reasons over the optimal time to go to the cafeteria based on the individual's historical behaviour.
- Push Notifications & Alerts: Firebase Cloud Messaging (FCM) to notify users about free study space availability, order ready alerts, and low crowd cafeteria times.

## Style Guidelines:

- Primary color: A muted blue (#5DADE2) evoking trust and intelligence.
- Background color: Very light blue (#EBF5FB), providing a clean, spacious feel.
- Accent color: Soft orange (#F5B041) to highlight calls to action.
- Body and headline font: 'Inter' (sans-serif) for a modern and neutral look.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use clean, minimalist icons to represent lab spaces, cafeteria, and notifications.
- Clean and intuitive layout, focusing on easy navigation and clear information hierarchy.
- Subtle transitions and animations for real-time updates and notifications to enhance user experience.