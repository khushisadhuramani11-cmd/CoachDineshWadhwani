import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessionalJourneyCarousel from './components/ui/professional-journey-carousel';
import './style.css'; // Import styles for bundling
import './main.js';    // Import the legacy JS logic

// Find the mount point for React
const journeyContainer = document.getElementById('root-professional-journey');

if (journeyContainer) {
    const root = createRoot(journeyContainer);
    root.render(
        <React.StrictMode>
            <ProfessionalJourneyCarousel />
        </React.StrictMode>
    );
}

// Ensure the page is ready for our main.js logic (which uses DOMContentLoaded)
// Since this is a module, the DOM is likely already ready, but main.js has its own listener.
