## Klymates

Welcome to Klymates, a web application designed to help you plan your travels with sustainability in mind.
This frontend is built with React and Vite, and it’s packed with features to make your travel planning seamless, interactive, and eco-friendly.

## Features

Climate-Conscious Travel: Get insights into the environmental impact of your travel choices.

Community Forum: Connect with other travelers, share tips, and ask questions in our community forum.

Itinerary Planner: Plan your trips easily using our itinerary planner.

Interactive Map: Explore destinations and find points of interest with an interactive map.

User Profiles: Create and customize your profile to save itineraries and forum posts.

Search & Recommendations: Discover the best places with smart search and personalized recommendations.

Offline Support: Browse cached content even without an internet connection, thanks to Service Workers and an Offline Banner.

## Getting Started

Follow these steps to run Klymates locally.

## Prerequisites

Make sure you have Node.js and npm installed:

npm install npm@latest -g

## Installation

Clone the repository

git clone https://github.com/Rubil-Mogere-94/capstone-frontend.git
cd capstone-frontend


## Install dependencies

npm install


## Run the development server

npm run dev


  Your frontend should now be running at http://localhost:5173
.

## Artificial Intelligence (AI) Integration

Klymates integrates a lightweight AI-powered recommendation engine that helps users discover destinations and eco-friendly travel options tailored to their preferences.

## How It Works

Learns from user preferences, saved itineraries, and search history.

Suggests sustainable destinations, travel activities, and routes.

AI logic runs in the frontend, supported by backend data aggregation for better accuracy.

## Key Components

RecommendationPage.jsx

SearchResults.jsx

ExplorePage.jsx

## APIs Used

Klymates connects with several external APIs through the Flask backend to bring real-time, accurate travel data.

1. LocationIQ API

Purpose: Provides geolocation data such as coordinates and map details for searched destinations.

Usage: Backend handles requests and returns results to the frontend for display.

Example Endpoint:

GET /api/location/search?q=paris

2. Wikipedia API 

Purpose: Fetches travel destination summaries and information.

Usage: Used in destination pages and itineraries to display contextual info.

Example Endpoint:

GET /api/search?q=paris

3. OpenStreetMap (via LocationIQ)

Purpose: Provides map tiles and route data.

Usage: Powers map visualization in MapComponent.jsx and ItineraryPlannerPage.jsx.

4. Firebase Authentication

Purpose: Handles secure user authentication for sign-up, login, and protected routes.

Usage: Integrated with both frontend and backend for token verification.

Example Flow:
Firebase issues an ID token → sent in request headers → Flask backend verifies token for access.

## Tech Stack

Frontend: React, Vite, Material UI, Framer Motion
Backend: Flask (Python)
Authentication: Firebase
APIs: LocationIQ, Wikipedia, OpenStreetMap
AI Layer: Custom recommendation logic using client-side pattern learning

## Authors

Built by Team Klymates with a shared vision for sustainable, data-driven travel experiences.