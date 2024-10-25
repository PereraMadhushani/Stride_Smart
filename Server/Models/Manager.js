const db = require('../config/database');
const bcrypt = require('bcrypt');

class Manager {
    static createManager(managerData, callback) {
        const { managerId, managerName, managerEmail, managerPassword, managerPhone } = managerData;

        bcrypt.hash(managerPassword, 10, (err, hash) => {
            if (err) {
                callback(err, null);
            } else {
                const insertManagerQuery = 'INSERT INTO `manager`(`m_id`, `m_name`, `m_email`, `m_password`, `m_phone`) VALUES (?,?,?,?,?)';
                db.query(insertManagerQuery, [managerId, managerName, managerEmail, hash, managerPhone], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }

    static getManager(email, password, callback) {
        const getManagerQuery = 'SELECT * FROM `manager` WHERE m_email = ?';
        db.query(getManagerQuery, [email], (err, result) => {
            if (err) {
                callback(err, null);
            } else if (result.length > 0) {
                const manager = result[0];
                bcrypt.compare(password, manager.m_password, (err, isMatch) => {
                    if (isMatch) {
                        callback(null, manager);
                    } else {
                        callback(null, null);
                    }
                });
            } else {
                callback(null, null);
            }
        });
    }
}

module.exports = Manager;
