import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { registerUser, getUsers, deleteUser,getNotifications } from './controllers/userController.js';

export function adminRouter(io) {
    const router = express.Router();

    //Image upload configuration
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
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/;
            const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = fileTypes.test(file.mimetype);

            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb('Error: Images Only!');
            }
        },
    });

    // Routes for user management
    // Routes for user management
    router.post('/register', (req, res, next) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            next();
        });
    }, registerUser);    router.get('/users', getUsers); // Get all users
    router.delete('/deleteUser/:id', deleteUser); // Delete user by ID
    router.get('/notifications/:userId', getNotifications);


    // Define additional admin routes here if needed
    // Example:
    // router.get('/some-admin-route', (req, res) => {
    //     res.send('Hello from admin route!');
    // });

    return router;
}
