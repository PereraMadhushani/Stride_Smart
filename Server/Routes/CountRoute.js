import express from 'express';
import con from '../Utils/db.js';


const router = express.Router();

export const countRouter = (io) => {

router.get('/employee_count', (req,res) =>{
    const sql = "SELECT count(e_id) AS employee FROM employee";
    con.query(sql, (err, result)=>{
        if(err) return res.json({Status: false, Error: "Query Error"+ err})
            return res.json({Status: true, Result: result});

    })
})

router.get('/manager_count', (req,res) =>{
    const sql = "SELECT count(m_id) AS manager FROM manager";
    con.query(sql, (err, result)=>{
        if(err) return res.json({Status: false, Error: "Query Error"+ err})
            return res.json({Status: true, Result: result});

    })
})

router.get('/driver_count', (req,res) =>{
    const sql = "SELECT count(d_id) AS driver FROM driver";
    con.query(sql, (err, result)=>{
        if(err) return res.json({Status: false, Error: "Query Error"+ err})
            return res.json({Status: true, Result: result});

    })
})

router.get('/order_count', (req,res) =>{
    const sql = "SELECT count(id) AS order FROM order";
    con.query(sql, (err, result)=>{
        if(err) return res.json({Status: false, Error: "Query Error"+ err})
            return res.json({Status: true, Result: result});

    })
})
return router;
}

