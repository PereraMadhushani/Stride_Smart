import express from 'express';
import con from '../Utils/db.js'; // Ensure this is your correct DB connection
import { io } from '../index.js';

const router = express.Router();

export const leaveRouter = (io) => {
  // Route to apply for leave
  router.post('/apply', (req, res, next) => {
    const { regNumber, leaveDate, duration } = req.body;

    // Input validation
    if (!regNumber || !leaveDate || !duration) {
      return res.status(400).send({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO leaverequest (regNumber, date, leave_date, duration, status) VALUES (?, NOW(), ?, ?, "Pending")';

    con.query(query, [regNumber, leaveDate, duration], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return next(err); // Pass error to next middleware
      }

      io.emit('leaveApplied', { leave_id: result.insertId, regNumber: regNumber, status: 'Pending' });

      res.status(201).send({ message: 'Leave applied successfully', leave_id: result.insertId });
    });
  });

 // This is your code for fetching leave requests
      router.get('/apply', (req, res, next) => {
        const query = `
          SELECT lr.*, u.regNumber AS appliedBy 
          FROM leaverequest lr
          JOIN user u ON lr.regNumber = u.regNumber`;  // Ensure this does not reference user_id

        con.query(query, (err, results) => {
          if (err) {
            console.error('Database Error:', err);
            return next(err); // Pass error to next middleware
          }
          res.send({ Status: true, Result: results });
        });
      });


  // Route to approve leave
  router.post('/approve', (req, res, next) => {
    const { leave_id } = req.body;
    const query = 'UPDATE leaverequest SET status = "Approved" WHERE leave_id = ?';

    con.query(query, [leave_id], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return next(err); // Pass error to next middleware
      }

      if (result.affectedRows > 0) {
        io.emit('leaveStatusUpdated', { leave_id, status: 'Approved' });
        res.send({ message: 'Leave Approved' });
      } else {
        res.status(404).send({ message: 'No record found for this leave request' });
      }
    });
  });

  // Route to reject leave
  router.post('/reject', (req, res, next) => {
    const { leave_id } = req.body;
    const query = 'UPDATE leaverequest SET status = "Rejected" WHERE leave_id = ?';

    con.query(query, [leave_id], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return next(err); // Pass error to next middleware
      }

      if (result.affectedRows > 0) {
        io.emit('leaveStatusUpdated', { leave_id, status: 'Rejected' });
        res.send({ message: 'Leave Rejected' });
      } else {
        res.status(404).send({ message: 'No record found for this leave request' });
      }
    });
  });

  return router;
};
