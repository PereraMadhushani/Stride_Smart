import React from 'react';
import './index.css';

const OrderPage = ({ setPage }) => {
  return (
    <div className="order-page">
      <h1>Orders</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>Date</th>
            <th>DueDate</th>
            <th>Qty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Add your order rows here */}
        </tbody>
      </table>
      <button onClick={() => setPage('add-order')} className="add-order-button">+</button>
    </div>
  );
};

export default OrderPage;