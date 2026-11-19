import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    };
    this.timerID = null;
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  formatTime(date) {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  formatDate(date) {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div className="header">
        <h1>💰 Sổ Chi Tiêu Cá Nhân</h1>
        <div className="clock">
          🕐 {this.formatTime(currentTime)} — {this.formatDate(currentTime)}
        </div>
      </div>
    );
  }
}

export default Header;

