# Đề Bài & Yêu Cầu Dự Án (Project Requirements)

Sinh viên xây dựng ứng dụng "Sổ chi tiêu cá nhân" hai lần: Phần A bằng Class Component, Phần B bằng Function Component + Hooks. Không dùng React Router, Redux, thư viện UI.

---

## 1. Bài toán
Ghi lại các khoản chi hằng ngày:
- Nội dung chi tiêu
- Số tiền chi
- Loại chi tiêu: **Ăn uống** / **Đi lại** / **Học tập** / **Giải trí**
- Ngày chi

Giao diện gồm:
- Header có đồng hồ thời gian thực
- Form thêm khoản chi (có validation)
- Nút lọc theo loại chi tiêu
- Danh sách khoản chi có nút Xóa (có xác nhận)
- Dòng hiển thị tổng tiền

---

## 2. Phần A – Class Component
1. Chia component rõ ràng, component `App` giữ state danh sách (dữ liệu mẫu viết sẵn trong code) và loại đang lọc.
2. Đồng hồ chạy mỗi giây và dừng đúng cách khi bị ẩn (`componentDidMount`, `componentWillUnmount`).
3. Form thêm khoản chi có validate; danh sách dùng `key`, xóa có xác nhận; lọc theo loại và hiển thị tổng tiền.
4. Tiêu đề tab trình duyệt hiển thị tổng chi, cập nhật bằng `componentDidUpdate`.

---

## 3. Phần B – Function Component + Hooks
1. Viết lại toàn bộ Phần A bằng Function Component (`useState`, `useEffect`).
2. Lấy, thêm, xóa dữ liệu qua mock API bằng custom hook `useFetch`; có trạng thái đang tải (`loading`) và lỗi (`error`).
3. Dùng `useRef` để focus ô nhập sau khi thêm; dùng `useContext` cho chế độ sáng/tối (Dark/Light mode).
4. Trong README, nêu ngắn Hooks đã giúp khắc phục các thách thức của Class ở những chỗ nào trong bài.

---

## 4. Yêu cầu nâng cao
- Custom hook `useClock`
- Thống kê tổng tiền theo từng loại chi tiêu
- Ô tìm kiếm có độ trễ (`debounce`)

---

## 5. Nộp bài
- Link GitHub gồm hai thư mục `part-a-class`, `part-b-hooks` và `README.md` (họ tên, mã sinh viên, cách chạy).
- Repo GitHub để chế độ **PUBLIC**.
