# Sổ Chi Tiêu Cá Nhân - Personal Expense Tracker

> **Họ tên:** Vũ Khai Hoàn  
> **Mã sinh viên:** B25DCTV021  
> **Repository:** https://github.com/VU-KHAI-HOAN-B25DCTV021/B25DCTV021----TH3  

Ứng dụng React ghi lại các khoản chi hàng ngày, được xây dựng hai lần:
- **Phần A** – Class Component
- **Phần B** – Function Component + Hooks

*Không sử dụng React Router, Redux, hay thư viện UI bên ngoài.*

---

## 📌 Yêu Cầu Đề Bài (Requirements)

Sinh viên xây dựng ứng dụng "Sổ chi tiêu cá nhân" hai lần: Phần A bằng Class Component, Phần B bằng Function Component + Hooks. Không dùng React Router, Redux, thư viện UI.

### 1. Bài toán chung
Ghi lại các khoản chi hằng ngày (nội dung, số tiền, loại: Ăn uống / Đi lại / Học tập / Giải trí, ngày chi). Giao diện gồm: header có đồng hồ, form thêm khoản chi, nút lọc theo loại, danh sách khoản chi có nút Xóa và dòng tổng tiền.

### 2. Phần A – Class Component
- [x] **1. Chia component**: `App` giữ state danh sách (dữ liệu mẫu viết sẵn trong code) và loại đang lọc.
- [x] **2. Đồng hồ realtime**: Chạy mỗi giây và dừng đúng cách khi bị ẩn (`componentDidMount`, `componentWillUnmount`).
- [x] **3. Form & Danh sách**: Form thêm khoản chi có validate; danh sách dùng key, xóa có xác nhận (`window.confirm`); lọc theo loại và hiển thị tổng tiền.
- [x] **4. Tiêu đề tab**: Hiển thị tổng chi, cập nhật bằng `componentDidUpdate`.

### 3. Phần B – Function Component + Hooks
- [x] **1. Viết lại toàn bộ Phần A** bằng Function Component (`useState`, `useEffect`).
- [x] **2. Mock API**: Lấy, thêm, xóa dữ liệu qua mockapi bằng custom hook `useFetch`; có trạng thái đang tải (`loading`) và lỗi (`error`).
- [x] **3. Hooks nâng cao**: Dùng `useRef` để focus ô nhập sau khi thêm; dùng `useContext` cho chế độ sáng/tối (ThemeContext).
- [x] **4. So sánh trong README**: Nêu ngắn Hooks đã giúp khắc phục các thách thức của Class ở những chỗ nào trong bài.

### 4. Yêu cầu nâng cao
- [x] **Custom hook `useClock`**: Tách logic đồng hồ realtime thành hook độc lập, tự dọn dẹp interval.
- [x] **Thống kê tổng tiền theo từng loại**: Hiển thị card thống kê chi tiết cho từng danh mục chi tiêu.
- [x] **Ô tìm kiếm có độ trễ (debounce)**: Custom hook `useDebounce` tối ưu hóa tìm kiếm không giật lag.

---

## 🚀 Cách Chạy Dự Án

### Yêu cầu môi trường
- Node.js (phiên bản 16 trở lên)
- Trình quản lý gói npm

### Phần A – Class Component
```bash
cd part-a-class
npm install
npm start
```
Truy cập: [http://localhost:3000](http://localhost:3000)

### Phần B – Function Component + Hooks
```bash
cd part-b-hooks
npm install
npm start
```
Truy cập: [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Cấu Trúc Dự Án

```text
├── README.md                 # Tài liệu hướng dẫn & giải thích
├── REQUIREMENTS.md           # Chi tiết yêu cầu đề bài
├── .gitignore                # Bỏ qua node_modules, build,...
│
├── part-a-class/             # PHẦN A: CLASS COMPONENT
│   ├── package.json
│   ├── public/index.html
│   └── src/
│       ├── App.js            # Component gốc, giữ state danh sách & loại đang lọc
│       ├── App.css           # CSS thuần phong cách hiện đại
│       ├── index.js
│       └── components/
│           ├── Header.js     # Header + đồng hồ (componentDidMount/WillUnmount)
│           ├── ExpenseForm.js# Form thêm khoản chi có validation
│           ├── FilterBar.js  # Thanh lọc theo danh mục
│           ├── ExpenseList.js# Danh sách khoản chi dùng key
│           ├── ExpenseItem.js# Mục chi tiêu + nút Xóa có confirm
│           ├── TotalDisplay.js# Hiển thị tổng tiền
│           └── CategoryStats.js# Thống kê tổng tiền theo từng loại
│
└── part-b-hooks/             # PHẦN B: FUNCTION COMPONENT + HOOKS
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js            # Component gốc (Function Component)
        ├── App.css           # CSS hỗ trợ cả Light Mode & Dark Mode
        ├── index.js          # Bọc ThemeProvider
        ├── context/
        │   └── ThemeContext.js# Quản lý chế độ sáng/tối (useContext)
        ├── hooks/
        │   ├── useClock.js   # Custom hook đồng hồ (Nâng cao)
        │   ├── useFetch.js   # Custom hook CRUD mock API (loading/error)
        │   └── useDebounce.js# Custom hook debounce tìm kiếm (Nâng cao)
        └── components/
            ├── Header.js     # Header + useClock + toggle Dark mode
            ├── ExpenseForm.js# Form + useRef tự động focus lại sau khi thêm
            ├── FilterBar.js  # Lọc danh mục
            ├── SearchBar.js  # Ô tìm kiếm debounce
            ├── ExpenseList.js# Danh sách + trạng thái loading
            ├── ExpenseItem.js
            ├── TotalDisplay.js
            └── CategoryStats.js
```

---

## 💡 Hooks Đã Giúp Khắc Phục Các Thách Thức Của Class Như Thế Nào?

### 1. `useState` thay thế `this.state` + `this.setState`
- **Class (Part A):** Phải khai báo toàn bộ state trong `constructor()`, cập nhật thông qua `this.setState()`, và phải bind `this` cho các event handler.
- **Hooks (Part B):** `useState` cho phép khai báo state trực tiếp trong function body. Mỗi state có setter riêng biệt, không cần constructor hay bind `this`.
- **Áp dụng:** Toàn bộ component (`App.js`, `ExpenseForm.js`) đều chuyển sang dùng `useState`.

### 2. `useEffect` thay thế lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`)
- **Class (Part A):** Logic bị phân mảnh qua nhiều lifecycle methods. Ví dụ: `Header.js` phải khởi tạo interval ở `componentDidMount` và dọn dẹp ở `componentWillUnmount` — hai method tách rời cho cùng một logic.
- **Hooks (Part B):** `useEffect` gom toàn bộ logic liên quan lại một chỗ. Hàm cleanup (`return () => clearInterval(...)`) thay thế hoàn hảo cho `componentWillUnmount`.
- **Áp dụng:**
  - **Đồng hồ (`Header.js` / `useClock.js`):** Gom toàn bộ logic đếm giờ và cleanup vào 1 hook.
  - **Tab title (`App.js`):** Class dùng `componentDidUpdate`, Hooks dùng `useEffect` với dependency `[expenses]`, chỉ chạy lại khi chi tiêu thay đổi.

### 3. `useRef` – Tự động focus ô nhập sau khi thêm
- **Class:** Phải tạo ref qua `React.createRef()` trong constructor, gán `ref={this.inputRef}` và gọi qua `this.inputRef.current.focus()`.
- **Hooks:** Khai báo nhanh gọn `const contentRef = useRef(null)`.
- **Áp dụng:** `ExpenseForm.js` (Part B) tự động đưa con trỏ chuột về ô "Nội dung" sau khi thêm thành công, tối ưu trải nghiệm nhập liệu liên tục.

### 4. `useContext` – Chế độ Giao diện Sáng / Tối (Dark Mode)
- **Class:** Cần dùng `Context.Consumer` theo dạng render-props phức tạp hoặc gán `static contextType`.
- **Hooks:** Chỉ cần 1 dòng `const { isDark, toggleTheme } = useTheme()`.
- **Áp dụng:** `ThemeContext.js` cung cấp trạng thái giao diện toàn app. Nút chuyển đổi ☀️/🌙 trong `Header.js` thao tác trực tiếp, làm đổi theme của toàn bộ `App.js`.

### 5. Custom Hooks – Tái sử dụng logic (Yêu cầu nâng cao)
- **Class:** Muốn chia sẻ logic giữa các component phải dùng Higher-Order Component (HOC) hoặc Render Props, gây "wrapper hell" và khó debug.
- **Hooks:** Đóng gói logic thành các hàm Javascript thuần túy (Custom Hooks).
- **Áp dụng:**
  - `useClock`: Tách rời đồng hồ thành hook độc lập.
  - `useFetch`: Quản lý toàn bộ vòng đời lấy dữ liệu từ mock API, tự động quản lý cờ `loading` và `error`.
  - `useDebounce`: Tái sử dụng cho bất kỳ ô tìm kiếm nào cần độ trễ.

### 6. Không cần bận tâm về `this`
- **Class:** Rất dễ gặp lỗi `TypeError: Cannot read property of undefined` khi quên bind methods trong constructor.
- **Hooks:** Function component hoạt động dựa trên cơ chế closure tự nhiên của JavaScript, hoàn toàn không cần `this`.

---

## 📜 Giấy phép & Thông tin

Dự án thuộc bài tập thực hành môn học của sinh viên **Vũ Khai Hoàn** (Mã SV: **B25DCTV021**).
