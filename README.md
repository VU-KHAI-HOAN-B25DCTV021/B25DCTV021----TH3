# Sổ Chi Tiêu Cá Nhân - Personal Expense Tracker

> **Họ tên:** Vũ Khai Hoàn  
> **Mã sinh viên:** B25DCTV021  
> **Repository:** https://github.com/VU-KHAI-HOAN-B25DCTV021/B25DCTV021----TH3  

Ứng dụng React ghi lại các khoản chi hàng ngày, được xây dựng hai lần:
- **Phần A** – Class Component
- **Phần B** – Function Component + Hooks

Không sử dụng React Router, Redux, hay thư viện UI bên ngoài.

---

## Tính năng

| Tính năng | Mô tả |
|-----------|-------|
| ➕ Thêm khoản chi | Form với validate đầy đủ (nội dung, số tiền, loại, ngày) |
| 🗑️ Xóa khoản chi | Xóa với hộp thoại xác nhận |
| 🔍 Lọc theo loại | Ăn uống / Đi lại / Học tập / Giải trí / Tất cả |
| 🔎 Tìm kiếm | Ô tìm kiếm với debounce (Part B) |
| 🕐 Đồng hồ realtime | Hiển thị giờ, phút, giây cập nhật mỗi giây |
| 📊 Thống kê | Tổng tiền theo từng loại chi tiêu |
| 🌙 Chế độ tối | Chuyển đổi sáng/tối bằng useContext (Part B) |
| 📄 Tab title | Hiển thị tổng chi tiêu trên tiêu đề tab trình duyệt |

---

## Cách chạy

### Phần A – Class Component
```bash
cd part-a-class
npm install
npm start
```
Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

### Phần B – Function Component + Hooks
```bash
cd part-b-hooks
npm install
npm start
```
Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

---

## Cấu trúc dự án

```
├── README.md
├── part-a-class/
│   └── src/
│       ├── App.js              # Component gốc, giữ state
│       ├── App.css             # Styles
│       └── components/
│           ├── Header.js       # Header + đồng hồ (componentDidMount/WillUnmount)
│           ├── ExpenseForm.js  # Form thêm khoản chi (validate)
│           ├── FilterBar.js    # Nút lọc theo loại
│           ├── ExpenseList.js  # Danh sách khoản chi
│           ├── ExpenseItem.js  # Từng mục chi tiêu
│           ├── TotalDisplay.js # Hiển thị tổng tiền
│           └── CategoryStats.js# Thống kê theo loại
│
├── part-b-hooks/
│   └── src/
│       ├── App.js              # Component gốc (Function Component)
│       ├── App.css             # Styles + Dark theme
│       ├── components/
│       │   ├── Header.js       # Header + useClock + theme toggle
│       │   ├── ExpenseForm.js  # Form + useRef (auto-focus)
│       │   ├── FilterBar.js    # Lọc theo loại
│       │   ├── SearchBar.js    # Tìm kiếm debounce
│       │   ├── ExpenseList.js  # Danh sách + loading state
│       │   ├── ExpenseItem.js  # Từng mục chi tiêu
│       │   ├── TotalDisplay.js # Hiển thị tổng tiền
│       │   └── CategoryStats.js# Thống kê theo loại
│       ├── hooks/
│       │   ├── useFetch.js     # Custom hook CRUD mock API
│       │   ├── useClock.js     # Custom hook đồng hồ
│       │   └── useDebounce.js  # Custom hook debounce
│       └── context/
│           └── ThemeContext.js  # Context chế độ sáng/tối
```

---

## Hooks đã giúp khắc phục các thách thức của Class Component ở những chỗ nào trong bài?

### 1. `useState` thay thế `this.state` + `this.setState`

- **Class (Part A):** Phải khai báo state trong `constructor()`, dùng `this.setState()` để cập nhật, và phải bind `this` cho các event handler (hoặc dùng arrow function trong class field).
- **Hooks (Part B):** `useState` cho phép khai báo state trực tiếp trong function body, mỗi state có setter riêng biệt, không cần constructor hay bind.
- **Áp dụng:** Toàn bộ component (`App.js`, `ExpenseForm.js`) đều chuyển từ class state sang `useState`.

### 2. `useEffect` thay thế lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`)

- **Class (Part A):** Logic bị phân tán qua nhiều lifecycle methods. Ví dụ `Header.js` cần `componentDidMount` để start interval đồng hồ VÀ `componentWillUnmount` để clear interval — hai method tách rời cho cùng một logic.
- **Hooks (Part B):** `useEffect` gom logic liên quan lại một chỗ. Cleanup function (return) thay thế `componentWillUnmount`.
- **Áp dụng:**
  - **Đồng hồ (`Header.js`):** Class cần 2 lifecycle methods → Hooks chỉ cần 1 `useEffect` với cleanup trong `useClock.js`.
  - **Tab title (`App.js`):** Class dùng `componentDidUpdate` → Hooks dùng `useEffect` với dependency `[expenses]`, chỉ chạy khi expenses thay đổi (hiệu quả hơn).

### 3. `useRef` – Focus ô nhập sau khi thêm

- **Class:** Phải dùng `React.createRef()` trong constructor, lưu vào `this.inputRef`, rồi gọi `this.inputRef.current.focus()`.
- **Hooks:** `useRef(null)` đơn giản hơn, khai báo ngay trong function body.
- **Áp dụng:** `ExpenseForm.js` (Part B) dùng `useRef` để tự động focus vào ô "Nội dung" sau khi thêm thành công, giúp nhập liên tục nhanh hơn.

### 4. `useContext` – Chế độ sáng/tối

- **Class:** Phải dùng `static contextType = ThemeContext` hoặc `<ThemeContext.Consumer>` (render props pattern), code dài dòng và khó đọc khi cần nhiều context.
- **Hooks:** `useContext(ThemeContext)` lấy giá trị context trong 1 dòng code.
- **Áp dụng:** `ThemeContext.js` cung cấp `isDark` và `toggleTheme`. `Header.js` dùng `useTheme()` để hiện nút toggle 🌙/☀️. `App.js` dùng `isDark` để thêm class `dark` cho toàn bộ container.

### 5. Custom Hooks – Tái sử dụng logic (Yêu cầu nâng cao)

- **Class:** Muốn chia sẻ logic giữa các component phải dùng HOC (Higher-Order Components) hoặc Render Props → gây "wrapper hell", khó debug.
- **Hooks:** Custom hooks cho phép tái sử dụng logic đơn giản như gọi hàm, không tạo thêm component wrapper.
- **Áp dụng:**
  - **`useClock`:** Tách logic đồng hồ ra khỏi Header → có thể dùng lại ở bất kỳ component nào.
  - **`useFetch`:** Đóng gói toàn bộ CRUD logic (getAll, create, delete) + trạng thái `loading`/`error` → component chỉ cần gọi `useFetch()`.
  - **`useDebounce`:** Hook tổng quát, dùng cho bất kỳ ô tìm kiếm nào cần delay input.

### 6. Không cần bind `this`

- **Class:** Phải bind methods trong constructor (`this.handleSubmit = this.handleSubmit.bind(this)`) hoặc dùng arrow function syntax, dễ quên và gây bug `this is undefined`.
- **Hooks:** Functions trong function component là closures bình thường, không có `this` → không bao giờ cần bind.

---

## Công nghệ sử dụng

- React 18 (create-react-app)
- CSS thuần (không UI library)
- LocalStorage mock API (Part B)

---

## License

Dự án phục vụ mục đích học tập.

