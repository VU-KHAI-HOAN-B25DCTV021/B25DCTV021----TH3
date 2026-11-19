import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import useFetch from './hooks/useFetch';
import useDebounce from './hooks/useDebounce';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import ExpenseList from './components/ExpenseList';
import TotalDisplay from './components/TotalDisplay';
import CategoryStats from './components/CategoryStats';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

function App() {
  const { isDark } = useTheme();
  const { expenses, loading, error, addExpense, deleteExpense } = useFetch();
  const [filterCategory, setFilterCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Cập nhật tiêu đề tab
  useEffect(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')}đ`;
  }, [expenses]);

  // Lọc theo loại
  let filteredExpenses = expenses;
  if (filterCategory !== 'Tất cả') {
    filteredExpenses = filteredExpenses.filter((e) => e.category === filterCategory);
  }

  // Tìm kiếm với debounce
  if (debouncedSearch.trim()) {
    const search = debouncedSearch.toLowerCase();
    filteredExpenses = filteredExpenses.filter(
      (e) =>
        e.content.toLowerCase().includes(search) ||
        e.category.toLowerCase().includes(search)
    );
  }

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleDelete = (id) => {
    const expense = expenses.find((e) => e.id === id);
    if (window.confirm(`Bạn có chắc muốn xóa "${expense?.content}"?`)) {
      deleteExpense(id);
    }
  };

  return (
    <div className={`app-container ${isDark ? 'dark' : ''}`}>
      <Header />
      <ExpenseForm categories={CATEGORIES} onAdd={addExpense} />
      <FilterBar
        categories={CATEGORIES}
        activeFilter={filterCategory}
        onFilterChange={setFilterCategory}
      />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {error && <div className="error-message">⚠️ {error}</div>}
      <ExpenseList
        expenses={filteredExpenses}
        loading={loading}
        onDelete={handleDelete}
      />
      <CategoryStats expenses={expenses} categories={CATEGORIES} />
      <TotalDisplay total={total} />
    </div>
  );
}

export default App;

