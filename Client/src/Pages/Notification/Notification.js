import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend server URL

const Notification = () => {
    useEffect(() => {
        // Listen for new-user-registered event
        socket.on('new-user-registered', (data) => {
            alert(`New user registered: ${data.name} with role ${data.role}`);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('new-user-registered');
        };
    }, []);

    return (
        <div>
            <h1>Manager Notifications</h1>
            {/* Other notification display logic */}
        </div>
    );
};

export default Notification;
