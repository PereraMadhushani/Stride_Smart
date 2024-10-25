import express from 'express';
import con from '../Utils/db.js'; // Ensure this is your correct DB connection

const router = express.Router();

export const employeeRouter = (io) => {

  // API endpoint to get employee data
  router.get('/employees', (req, res) => {
  const sql = 'SELECT regNumber, name, email, address, contact_number, image FROM employee';
  con.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);  // Send the fetched data as JSON
      }
  });
});


  router.delete('/delete_employee/:e_id', (req, res) => {
    const employeeId = req.params.e_id;
    
    const deleteQuery = `DELETE FROM employee WHERE e_id = ?`;
    
    con.query(deleteQuery, [employeeId], (err, result) => {
      if (err) {
        return res.status(500).json({ Error: 'Error deleting employee' });
      }
      res.json({ Status: 'Employee deleted successfully' });
    });
  });

  // In your employeeRoute.js or similar
router.put('/update_employee/:e_id', (req, res) => {
  const { e_id } = req.params;
  const { name, image, address, contact_number, email } = req.body;

  const query = `UPDATE employee
                SET name = ?, image = ?, address = ?, contact_number = ?, email = ?
                WHERE e_id = ?`;

  con.query(query, [name, image, address, contact_number, email, e_id], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).send({ Error: 'Error updating employee' });
    }
    res.send({ Status: true, message: 'Employee updated successfully' });
  });
});

  
  
    return router; // Ensure we return the router instance
}

export default router;
