import bcrypt from 'bcrypt';
import multer from 'multer';
import { WebSocketServer } from 'ws';
import con from '../../Utils/db.js';

global.wsConnections = {};

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'Public/Images';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null,  `image_${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

// Create the WebSocket server
const wss = new WebSocketServer({ port: 8091 });
wss.on('connection', (ws, req) => {
    const userId = req.userId; // Assuming you set userId appropriately during connection
    global.wsConnections[userId] = ws;

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
    });

    ws.on('close', () => {
        delete global.wsConnections[userId];
    });
});

console.log('WebSocket server is running on ws://localhost:8091');

// User registration function
export const registerUser = async (req, res) => {
    console.log('RegisterUser function called');
    
    const { regNumber, name, role, password, email, address, contact_number } = req.body;
    const image = req.file ? req.file.filename : null; // Assuming you are using multer for file uploads
    
    console.log('Received data:', { regNumber, name, role, email, address, contact_number, image });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Insert user into the user table
        const userInsertQuery = 'INSERT INTO user (regNumber, name, role, password, email, address, contact_number, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const userValues = [regNumber, name, role, hashedPassword, email, address, contact_number, image];
        
        await con.query(userInsertQuery, userValues);
        console.log('User registered successfully in user table');

        // Insert into role-specific table
        let roleInsertQuery = '';
        const roleValues = [regNumber, name, email, address, contact_number, image]; // No password here

        // Determine the appropriate table and query based on the role
        switch (role) {
            case 'driver':
                roleInsertQuery = 'INSERT INTO driver (regNumber, name, email, address, contact_number, image) VALUES (?, ?, ?, ?, ?, ?)';
                break;

            case 'employee':
                roleInsertQuery = 'INSERT INTO employee (regNumber, name, email, address, contact_number, image) VALUES (?, ?, ?, ?, ?, ?)';
                break;

            case 'manager':
                roleInsertQuery = 'INSERT INTO manager (regNumber, name, email, address, contact_number, image) VALUES (?, ?, ?, ?, ?, ?)';
                break;

            case 'storemanager':
                roleInsertQuery = 'INSERT INTO storemanager (regNumber, name, email, address, contact_number, image) VALUES (?, ?, ?, ?, ?, ?)';
                break;

            case 'admin':
                roleInsertQuery = 'INSERT INTO admin (regNumber, name, email, address, contact_number, image) VALUES (?, ?, ?, ?, ?, ?)';
                break;

            default:
                console.log('Invalid role specified:', role);
                return res.status(400).send({ success: false, message: 'Invalid role specified.' });
        }

        console.log('Insert query determined:', roleInsertQuery);
        // Execute the insert query
        await con.query(roleInsertQuery, roleValues);
        console.log('User registered successfully in relevant table:', role);

// Notify managers about new registration
const message = `New user ${name} has been registered as a ${role}.`;
console.log('Notification message to managers:', message);

// Step 1: Retrieve managers with role "manager"
con.query('SELECT id FROM user WHERE role = "manager"', async (error, results) => {
    if (error) {
        console.error('Error retrieving managers:', error);
        return res.status(500).json({ success: false, error: 'Error retrieving managers' });
    }

    const managers = results; // Assign query results to `managers`
    console.log('Managers retrieved:', managers);

    // Step 2: Check if managers are found
    if (Array.isArray(managers) && managers.length > 0) {
        // Process each manager's notification asynchronously
        for (const manager of managers) {
            try {
                console.log('Sending notification to manager ID:', manager.id);

                // Step 3: Insert notification for each manager
                await new Promise((resolve, reject) => {
                    con.query(
                        'INSERT INTO notifications (id, message, status) VALUES (?, ?, "unread")',
                        [manager.id, message],
                        (insertError, result) => {
                            if (insertError) reject(insertError);
                            else resolve(result);
                        }
                    );
                });

                // Step 4: Send a real-time notification via WebSocket if the connection exists
                if (global.wsConnections[manager.id]) {
                    global.wsConnections[manager.id].send(JSON.stringify({ message }));
                    console.log('Real-time notification sent to manager ID:', manager.id);
                }
            } catch (error) {
                console.error('Error sending notification to manager ID:', manager.id, error);
            }
        }
        // Step 5: Respond with success after all notifications are sent
        return res.status(200).json({ status: true, message: 'User registered and notifications sent.' });
    } else {
        console.log('No managers found to notify.');
        return res.status(200).json({ status: true, message: 'User registered but no managers to notify.' });
    }
});
} catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send({ success: false, error: error.message });
}
};

// Get notifications for a specific user
export const getNotifications = (req, res) => {
    const { userId } = req.params; // Assume you pass the user's ID in the request params

    con.query('SELECT * FROM notifications WHERE id = ? AND status = "unread" ORDER BY created_at DESC', [userId], (error, results) => {
        if (error) {
            console.error('Error fetching notifications:', error);
            return res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
        }

        res.status(200).json({ success: true, notifications: results });
    });
};

    

export const getUsers = (req, res) => {
    console.log('GetUsers function called');
    
    con.query('SELECT * FROM user', (err, result) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).send({ success: false, error: 'Internal Server Error' });
        }

        // Check if result is an array and has users
        if (!Array.isArray(result) || result.length === 0) {
            console.log('No users found:', result);
            return res.status(404).send({ success: false, message: 'No users found.' });
        }

        console.log('Users retrieved:', result);
        res.status(200).json({ success: true, users: result });
    });
};





// Delete user function
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log('DeleteUser function called for ID:', id);
    
    try {
        await con.query('DELETE FROM user WHERE id = ?', [id]);
        console.log('User deleted successfully for ID:', id);
        res.status(200).send({ success: true, message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error during user deletion:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};

// Export multer upload middleware
export { upload }