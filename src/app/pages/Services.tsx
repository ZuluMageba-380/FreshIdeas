import React from 'react';
import { ServicesProps } from './servicesTypes';
import { Camera } from '@material-ui/icons'; // Adjust according to your icon imports

const Services: React.FC<ServicesProps> = () => {
    return (
        <div className="services">
            <div className="service-item">
                <Camera />
                <h2>Photography</h2>
                <p>Capture Your Story</p>
                <p>We provide stunning photography services for all occasions, capturing moments that last a lifetime. Our professional photographers use state-of-the-art equipment to deliver the best quality photos.</p>
                <ul>
                    <li>Event Photography</li>
                    <li>Portrait Sessions</li>
                    <li>Commercial Photography</li>
                    <li>Editing and Retouching</li>
                </ul>
            </div>
        </div>
    );
};

export default Services;