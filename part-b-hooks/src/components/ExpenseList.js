import React from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, loading, onDelete }) {
  if (loading) {
    return <div className="loading">⏳ Đang tải dữ liệu...</div>;
  }

  return (
    <div className="expense-list">
      <h2>📋 Danh sách chi tiêu ({expenses.length})</h2>
      {expenses.length === 0 ? (
        <div className="empty-message">Chưa có khoản chi nào 🎉</div>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;

