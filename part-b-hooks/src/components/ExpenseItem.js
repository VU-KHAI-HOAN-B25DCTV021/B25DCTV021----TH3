import React from 'react';

function ExpenseItem({ expense, onDelete }) {
  const getCategoryClass = (category) => {
    const map = {
      'Ăn uống': 'an-uong',
      'Đi lại': 'di-lai',
      'Học tập': 'hoc-tap',
      'Giải trí': 'giai-tri',
    };
    return map[category] || '';
  };

  const catClass = getCategoryClass(expense.category);

  return (
    <div className={`expense-item ${catClass}`}>
      <div className="expense-info">
        <div className="expense-content">{expense.content}</div>
        <div className="expense-meta">
          <span className={`expense-category ${catClass}`}>{expense.category}</span>
          <span>📅 {expense.date}</span>
        </div>
      </div>
      <div className="expense-amount">
        {expense.amount.toLocaleString('vi-VN')}đ
      </div>
      <button
        className="btn-delete"
        onClick={() => onDelete(expense.id)}
      >
        🗑️ Xóa
      </button>
    </div>
  );
}

export default ExpenseItem;

