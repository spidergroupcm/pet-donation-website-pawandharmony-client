import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
        // Define a mapping of routes to titles
        const routeTitles = {
            '/': 'Home | Paws & Harmony',
            '/services': 'Services | Paws & Harmony',
            '/dashboard/add-service': 'Add Service | Paws & Harmony',
            '/dashboard/manage-service': 'Manage Service | Paws & Harmony',
            '/dashboard/booked-services': 'Booked Services | Paws & Harmony',
            '/dashboard/service-to-do': 'Service to Do | Paws & Harmony',
            '/login': 'Login | Paws & Harmony',
            '/registration': 'Register | Paws & Harmony',

        };

        // Set the document title based on the route
        const title = routeTitles[location.pathname] || 'FastHelpBd';
        document.title = title;
    }, [location]); // Runs when the route changes

    return null; // This component doesn't render anything
};

export default DynamicTitle;

