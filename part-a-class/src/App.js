import React, { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import TotalDisplay from './components/TotalDisplay';
import CategoryStats from './components/CategoryStats';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

const SAMPLE_DATA = [
  { id: 1, content: 'Cơm trưa văn phòng', amount: 35000, category: 'Ăn uống', date: '2024-11-15' },
  { id: 2, content: 'Grab đi học', amount: 25000, category: 'Đi lại', date: '2024-11-15' },
  { id: 3, content: 'Mua sách React', amount: 150000, category: 'Học tập', date: '2024-11-14' },
  { id: 4, content: 'Xem phim rạp', amount: 90000, category: 'Giải trí', date: '2024-11-14' },
  { id: 5, content: 'Trà sữa', amount: 45000, category: 'Ăn uống', date: '2024-11-13' },
  { id: 6, content: 'Xe bus', amount: 7000, category: 'Đi lại', date: '2024-11-13' },
  { id: 7, content: 'Photocopy tài liệu', amount: 20000, category: 'Học tập', date: '2024-11-12' },
  { id: 8, content: 'Billiard cùng bạn', amount: 60000, category: 'Giải trí', date: '2024-11-12' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: SAMPLE_DATA,
      filterCategory: 'Tất cả',
      nextId: SAMPLE_DATA.length + 1,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const total = this.state.expenses.reduce((sum, e) => sum + e.amount, 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')}đ`;
  }

  handleAddExpense = (expense) => {
    this.setState((prev) => ({
      expenses: [
        ...prev.expenses,
        { ...expense, id: prev.nextId },
      ],
      nextId: prev.nextId + 1,
    }));
  };

  handleDeleteExpense = (id) => {
    const expense = this.state.expenses.find((e) => e.id === id);
    if (window.confirm(`Bạn có chắc muốn xóa "${expense.content}"?`)) {
      this.setState((prev) => ({
        expenses: prev.expenses.filter((e) => e.id !== id),
      }));
    }
  };

  handleFilterChange = (category) => {
    this.setState({ filterCategory: category });
  };

  getFilteredExpenses() {
    const { expenses, filterCategory } = this.state;
    if (filterCategory === 'Tất cả') return expenses;
    return expenses.filter((e) => e.category === filterCategory);
  }

  render() {
    const filteredExpenses = this.getFilteredExpenses();
    const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

    return (
      <div className="app-container">
        <Header />
        <ExpenseForm
          categories={CATEGORIES}
          onAdd={this.handleAddExpense}
        />
        <FilterBar
          categories={CATEGORIES}
          activeFilter={this.state.filterCategory}
          onFilterChange={this.handleFilterChange}
        />
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={this.handleDeleteExpense}
        />
        <CategoryStats expenses={this.state.expenses} categories={CATEGORIES} />
        <TotalDisplay total={total} />
      </div>
    );
  }
}

export default App;

