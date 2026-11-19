import { useState, useEffect, useCallback } from 'react';

// Mock API - giả lập API với delay và localStorage để lưu trữ
const STORAGE_KEY = 'expense-tracker-data';

const INITIAL_DATA = [
  { id: '1', content: 'Cơm trưa văn phòng', amount: 35000, category: 'Ăn uống', date: '2024-11-15' },
  { id: '2', content: 'Grab đi học', amount: 25000, category: 'Đi lại', date: '2024-11-15' },
  { id: '3', content: 'Mua sách React', amount: 150000, category: 'Học tập', date: '2024-11-14' },
  { id: '4', content: 'Xem phim rạp', amount: 90000, category: 'Giải trí', date: '2024-11-14' },
  { id: '5', content: 'Trà sữa', amount: 45000, category: 'Ăn uống', date: '2024-11-13' },
  { id: '6', content: 'Xe bus', amount: 7000, category: 'Đi lại', date: '2024-11-13' },
  { id: '7', content: 'Photocopy tài liệu', amount: 20000, category: 'Học tập', date: '2024-11-12' },
  { id: '8', content: 'Billiard cùng bạn', amount: 60000, category: 'Giải trí', date: '2024-11-12' },
];

function getStoredData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_DATA;
  } catch {
    return INITIAL_DATA;
  }
}

function setStoredData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Giả lập delay mạng
function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockApi = {
  async getAll() {
    await delay();
    return getStoredData();
  },

  async create(expense) {
    await delay();
    const data = getStoredData();
    const newExpense = {
      ...expense,
      id: String(Date.now()),
    };
    const updated = [...data, newExpense];
    setStoredData(updated);
    return newExpense;
  },

  async remove(id) {
    await delay();
    const data = getStoredData();
    const updated = data.filter((e) => e.id !== id);
    setStoredData(updated);
    return { success: true };
  },
};

function useFetch() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getAll();
      setExpenses(data);
    } catch (err) {
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Thêm khoản chi
  const addExpense = useCallback(async (expense) => {
    try {
      setLoading(true);
      setError(null);
      const newExpense = await mockApi.create(expense);
      setExpenses((prev) => [...prev, newExpense]);
    } catch (err) {
      setError('Không thể thêm khoản chi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa khoản chi
  const deleteExpense = useCallback(async (id) => {
    try {
      setError(null);
      await mockApi.remove(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError('Không thể xóa khoản chi. Vui lòng thử lại.');
    }
  }, []);

  // Tải dữ liệu khi mount
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    addExpense,
    deleteExpense,
    refetch: fetchExpenses,
  };
}

export default useFetch;

