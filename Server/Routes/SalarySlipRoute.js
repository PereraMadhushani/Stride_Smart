import express from 'express';
import con from '../Utils/db.js'; // Ensure this is your correct DB connection

const router = express.Router();

// Get all salary slips
router.get('/salary_slips', (req, res) => {
  const sql = 'SELECT * FROM salary_slips';
  con.query(sql, (err, results) => {
    if (err) return res.status(500).send('Error retrieving salary slips.');
    res.json(results);
  });
});

// Get salary slip by employee ID
router.get('/salary_slips/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM salary_slips WHERE employee_id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send('Error retrieving salary slip.');
    res.json(result);
  });
});

// Add a new salary slip
router.post('/salary_slips', (req, res) => {
  const { employee_id, employee_name, role, bank_name, bank_account, month, net_salary, shoe_sales } = req.body;
  const sql = 'INSERT INTO salary_slips (employee_id, employee_name, role, bank_name, bank_account, month, net_salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  con.query(sql, [employee_id, employee_name, role, bank_name, bank_account, month, net_salary], (err, result) => {
    if (err) return res.status(500).send('Error adding salary slip.');

    const slip_id = result.insertId;

    // Insert shoe sales records
    shoe_sales.forEach(sale => {
      const { shoe_size, quantity, unit_price, total } = sale;
      const salesSql = 'INSERT INTO shoe_sales (slip_id, shoe_size, quantity, unit_price, total) VALUES (?, ?, ?, ?, ?)';
      con.query(salesSql, [slip_id, shoe_size, quantity, unit_price, total], (err) => {
        if (err) return res.status(500).send('Error adding shoe sales record.');
      });
    });

    res.json({ message: 'Salary slip added successfully' });
  });
});

// Delete a salary slip by ID
routera.delete('/salary_slips/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM salary_slips WHERE slip_id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send('Error deleting salary slip.');
    res.json({ message: 'Salary slip deleted successfully' });
  });
});