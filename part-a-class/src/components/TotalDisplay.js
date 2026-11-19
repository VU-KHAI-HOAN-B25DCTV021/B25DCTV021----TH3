import React, { Component } from 'react';

class TotalDisplay extends Component {
  render() {
    const { total } = this.props;

    return (
      <div className="total-display">
        <span className="total-label">💵 Tổng chi tiêu:</span>
        <span className="total-amount">{total.toLocaleString('vi-VN')}đ</span>
      </div>
    );
  }
}

export default TotalDisplay;

