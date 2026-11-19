import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';

class ExpenseList extends Component {
  render() {
    const { expenses, onDelete } = this.props;

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
}

export default ExpenseList;

