import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      errors: {},
    };
  }

  validate() {
    const { content, amount, category, date } = this.state;
    const errors = {};

    if (!content.trim()) {
      errors.content = 'Vui lòng nhập nội dung chi tiêu';
    }
    if (!amount || Number(amount) <= 0) {
      errors.amount = 'Số tiền phải lớn hơn 0';
    }
    if (!category) {
      errors.category = 'Vui lòng chọn loại chi tiêu';
    }
    if (!date) {
      errors.date = 'Vui lòng chọn ngày';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validate()) return;

    const { content, amount, category, date } = this.state;
    this.props.onAdd({
      content: content.trim(),
      amount: Number(amount),
      category,
      date,
    });

    this.setState({
      content: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      errors: {},
    });
  };

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
      errors: { ...this.state.errors, [field]: '' },
    });
  };

  render() {
    const { content, amount, category, date, errors } = this.state;
    const { categories } = this.props;

    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <h2>➕ Thêm khoản chi</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Nội dung</label>
            <input
              type="text"
              placeholder="VD: Cơm trưa"
              value={content}
              onChange={this.handleChange('content')}
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
              onChange={this.handleChange('amount')}
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
              onChange={this.handleChange('category')}
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
              onChange={this.handleChange('date')}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <div className="error-text">{errors.date}</div>}
          </div>
        </div>
        <button type="submit" className="btn-add">Thêm khoản chi</button>
      </form>
    );
  }
}

export default ExpenseForm;

