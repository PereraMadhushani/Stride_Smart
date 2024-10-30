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

        const managers = await con.query('SELECT id FROM user WHERE role = "manager"');
        console.log('Managers retrieved:', managers);

        if (Array.isArray(managers) && managers.length > 0) {
            for (const manager of managers) {
                console.log('Sending notification to manager ID:', manager.id);
                
                // Insert notification for each manager
                await con.query(
                    'INSERT INTO notifications (id, message, status) VALUES (?, ?, "unread")',
                    [manager.id, message]
                );

                // If WebSocket connection exists for the manager, send a real-time notification
                if (global.wsConnections[manager.id]) {
                    global.wsConnections[manager.id].send(JSON.stringify({ message }));
                    console.log('Real-time notification sent to manager ID:', manager.id);
                }
            }
        }

        return res.status(200).json({ status: true, message: 'User registered and notifications sent.' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};

// // Get users function
// export const getUsers1 = async (req, res) => {
//     console.log('GetUsers function called');
    
//     try {
//         const result =  await con.query('SELECT * FROM user');
//         console.log('Raw query result:', result);

//         if (!Array.isArray(result) || result.length === 0) {
//             console.log('Unexpected result format1:', result);
//             return res.status(500).send({ success: false, message: 'Unexpected result format2.' });
//         }

//        /* console.log('Query result:', util.inspect(result, { depth: null })); // Log the result to see its structure

//         const users = result ;  // Assign directly if result is not an array*/
//         console.log('Users retrieved:', result);
//         res.status(200).json(result);
//     } catch (error) {
//         // Log only the error message
//         console.error('Error retrieving users:', error);
//         res.status(500).send({ success: false, error: error.message || 'Internal Server Error' });
//     }
// };

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
export { upload };
