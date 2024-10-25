import express from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import con from '../Utils/db.js';
import path from 'path';

const router = express.Router();

// Image upload configuration with file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
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

// Function to handle user registration
export const adminRouter = () => {
    router.post('/register', upload.single('image'), async (req, res, next) => {
        try {
            console.log(req.file);
            console.log(req.body);

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const { id, regNumber, name, role, password, email, address, contact_number } = req.body;
            if (!id || !regNumber || !name || !role || !password || !email || !address || !contact_number) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Hash the password before storing it in the database
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert into user table
            const userSql = 'INSERT INTO user (id, regNumber, name, role, password, email, address, contact_number, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const userValues = [id, regNumber, name, role, hashedPassword, email, address, contact_number, req.file.filename];

            con.query(userSql, userValues, (err, result) => {
                if (err) return next(err);

                // Insert into employee table after inserting into user
                const employeeSql = 'INSERT INTO employee (regNumber, name, address, contact_number, email) VALUES (?, ?, ?, ?, ?)';
                const employeeValues = [regNumber, name, address, contact_number, email];

                con.query(employeeSql, employeeValues, (err) => {
                    if (err) return next(err);
                    console.log(`Employee ${name} inserted into employee table.`);
                    return res.json({ status: true, userId: result.insertId });
                });
            });
        } catch (error) {
            next(error); // Pass unhandled error to the error handler
        }
    });

    router.get('/users', (req, res) => {
        const sql = 'SELECT * FROM user';
        con.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send('Error fetching users');
            }
            res.json(results);
        });
    });

    router.delete('/delete_user/:id', (req, res) => {
        const userId = req.params.id;
        const sql = 'DELETE FROM user WHERE id = ?';

        con.query(sql, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ Status: false, Error: 'Error deleting user' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Status: false, Error: 'User not found' });
            }

            res.json({ Status: true });
        });
    });
    return router;
};

export default router;
