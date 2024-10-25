const db = require('../config/database');
const bcrypt = require('bcrypt');

class StoreManager {
    static createStoreManager(storeManagerData, callback) {
        const { storeManagerId, storeManagerName, storeManagerEmail, storeManagerPassword, storeManagerPhone } = storeManagerData;

        bcrypt.hash(storeManagerPassword, 10, (err, hash) => {
            if (err) {
                callback(err, null);
            } else {
                const insertStoreManagerQuery = 'INSERT INTO `store_manager`(`sm_id`, `sm_name`, `sm_email`, `sm_password`, `sm_phone`) VALUES (?,?,?,?,?)';
                db.query(insertStoreManagerQuery, [storeManagerId, storeManagerName, storeManagerEmail, hash, storeManagerPhone], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }

    static getStoreManager(email, password, callback) {
        const getStoreManagerQuery = 'SELECT * FROM `store_manager` WHERE sm_email = ?';
        db.query(getStoreManagerQuery, [email], (err, result) => {
            if (err) {
                callback(err, null);
            } else if (result.length > 0) {
                const storeManager = result[0];
                bcrypt.compare(password, storeManager.sm_password, (err, isMatch) => {
                    if (isMatch) {
                        callback(null, storeManager);
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

module.exports = StoreManager;
