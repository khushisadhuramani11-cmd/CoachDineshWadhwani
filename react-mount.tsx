<<<<<<< HEAD
import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessionalJourneyCarousel from './components/ui/professional-journey-carousel';

// Find the mount point
const journeyContainer = document.getElementById('root-professional-journey');

if (journeyContainer) {
    const root = createRoot(journeyContainer);
    root.render(
        <React.StrictMode>
            <ProfessionalJourneyCarousel />
        </React.StrictMode>
    );
}
=======
import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessionalJourneyCarousel from './components/ui/professional-journey-carousel';

// Find the mount point
const journeyContainer = document.getElementById('root-professional-journey');

if (journeyContainer) {
    const root = createRoot(journeyContainer);
    root.render(
        <React.StrictMode>
            <ProfessionalJourneyCarousel />
        </React.StrictMode>
    );
}
>>>>>>> aca854ef880eb96c33be2d8b360adfaac5b8c9eb
