import React from 'react';

function CategoryStats({ expenses, categories }) {
  const getCategoryClass = (category) => {
    const map = {
      'Ăn uống': 'an-uong',
      'Đi lại': 'di-lai',
      'Học tập': 'hoc-tap',
      'Giải trí': 'giai-tri',
    };
    return map[category] || '';
  };

  return (
    <div className="category-stats">
      <h3>📊 Thống kê theo loại</h3>
      <div className="stats-grid">
        {categories.map((cat) => {
          const catExpenses = expenses.filter((e) => e.category === cat);
          const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
          return (
            <div key={cat} className={`stat-card ${getCategoryClass(cat)}`}>
              <div className="stat-name">{cat}</div>
              <div className="stat-amount">{total.toLocaleString('vi-VN')}đ</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryStats;

