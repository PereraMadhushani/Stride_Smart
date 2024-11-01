import React, { useEffect, useState } from 'react';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Handle the new registration notification
            if (data.type === 'NEW_REGISTRATION') {
                setNotifications((prev) => [...prev, data.message]);
            }
        };

        return () => socket.close();
    }, []);

    return (
        <div>
            <h3>Notifications</h3>
            <ul>
                {notifications.map((notify, index) => (
                    <li key={index}>{notify}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
