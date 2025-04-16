# Golf Course Explorer

A modern, responsive web application that helps golf enthusiasts discover and explore golf courses. Built with React, TypeScript, and Tailwind CSS, this app provides detailed course information, real-time weather updates, and interactive maps to enhance your golfing experience.

## Project Overview

Golf Course Explorer lets you:
- Search and browse through a comprehensive database of golf courses
- View detailed course statistics, including yardage, par, and ratings
- Check real-time weather conditions at each course
- See course locations on an interactive map
- Save your favorite courses for quick access
- View detailed scorecards with hole-by-hole information
- Toggle between men's and women's tee statistics

## Getting Started

### Prerequisites
- npm or yarn
- A modern web browser

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env` file in the root directory and add your API keys:
```
REACT_APP_GOLF_API_KEY=your_golf_api_key
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The app will be available at `http://localhost:3000`

## APIs Used

### Golf Course API
- Used for fetching comprehensive golf course data
- Provides course details, statistics, and scorecard information
- Endpoints handle course search and individual course details

### OpenWeather API
- Delivers real-time weather data for each course location
- Provides temperature, wind speed, and weather conditions
- Updates automatically when viewing course details

### Google Maps API
- Displays interactive maps showing course locations
- Uses custom styling for golf-themed map appearance
- Implements custom markers for better visibility

## Features & Implementation

### Core Features
- **TypeScript Integration**: Full type safety across the application
- **Responsive Design**: Seamless experience on both desktop and mobile devices
- **Real-time Data**: Live weather updates and course information
- **Interactive Maps**: Visual location representation with custom styling

### Additional Features
- **Custom Hooks**: 
  - `useWeather`: Manages weather data fetching and state
  - `useGoogleMaps`: Handles map initialization and interactions
  
- **State Management**: 
  - Efficient React state handling
  - Local storage for favorite courses
  - Loading states for better UX

- **Error Handling**:
  - Graceful fallbacks for API failures
  - User-friendly error messages
  - Loading indicators for async operations

- **Mobile Optimization**:
  - Touch-friendly interface
  - Responsive grid layouts
  - Optimized for various screen sizes

