import React, { useState, useRef } from 'react';

function ExpenseForm({ categories, onAdd }) {
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState({});

  // useRef để focus vào ô nhập sau khi thêm
  const contentRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!content.trim()) newErrors.content = 'Vui lòng nhập nội dung chi tiêu';
    if (!amount || Number(amount) <= 0) newErrors.amount = 'Số tiền phải lớn hơn 0';
    if (!category) newErrors.category = 'Vui lòng chọn loại chi tiêu';
    if (!date) newErrors.date = 'Vui lòng chọn ngày';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onAdd({
      content: content.trim(),
      amount: Number(amount),
      category,
      date,
    });

    // Reset form
    setContent('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});

    // Focus lại ô nội dung bằng useRef
    if (contentRef.current) {
      contentRef.current.focus();
    }
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>➕ Thêm khoản chi</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Nội dung</label>
          <input
            ref={contentRef}
            type="text"
            placeholder="VD: Cơm trưa"
            value={content}
            onChange={(e) => { setContent(e.target.value); clearError('content'); }}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <div className="error-text">{errors.content}</div>}
        </div>
        <div className="form-group">
          <label>Số tiền (VNĐ)</label>
          <input
            type="number"
            placeholder="VD: 50000"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); clearError('amount'); }}
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <div className="error-text">{errors.amount}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Loại</label>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); clearError('category'); }}
            className={errors.category ? 'error' : ''}
          >
            <option value="">-- Chọn loại --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <div className="error-text">{errors.category}</div>}
        </div>
        <div className="form-group">
          <label>Ngày chi</label>
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); clearError('date'); }}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <div className="error-text">{errors.date}</div>}
        </div>
      </div>
      <button type="submit" className="btn-add">Thêm khoản chi</button>
    </form>
  );
}

export default ExpenseForm;

