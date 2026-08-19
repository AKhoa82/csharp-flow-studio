# Giải thích cấu trúc dự án CSharpHub

## 1. Dự án này dùng để làm gì?

Đây là một ứng dụng web hỗ trợ học và quản lý nội dung học C# và lập trình hướng đối tượng (OOP). Ứng dụng có hai nhóm người dùng chính:

- **Người học:** xem khóa học, bài học, luyện tập, xem tiến độ, tìm kiếm nội dung và sử dụng gia sư AI.
- **Quản trị viên/biên tập viên:** quản lý danh mục, khóa học, chương, bài học, tài liệu, ngân hàng câu hỏi, bài kiểm tra và nội dung được hỗ trợ bởi AI.

Tên giao diện trong mã nguồn là **CSharpHub** và khu vực quản trị được gọi là **Content Studio**.

## 2. Công nghệ chính

| Công nghệ       | Chức năng và tác dụng                                      |
| --------------- | ---------------------------------------------------------- |
| React           | Xây dựng giao diện theo các component có thể tái sử dụng.  |
| TypeScript      | Thêm kiểu dữ liệu, giúp phát hiện lỗi khi viết code.       |
| Vite            | Chạy server phát triển và đóng gói ứng dụng nhanh.         |
| TanStack Router | Quản lý URL, route và các trang lồng nhau.                 |
| TanStack Start  | Cung cấp nền tảng chạy React có phần server và middleware. |
| TanStack Query  | Quản lý dữ liệu truy vấn và cache dữ liệu ở phía client.   |
| Tailwind CSS    | Tạo giao diện bằng các class CSS tiện ích.                 |
| Radix UI        | Cung cấp các component giao diện có khả năng truy cập tốt. |
| Lucide React    | Cung cấp biểu tượng cho menu và nút thao tác.              |
| Sonner          | Hiển thị thông báo ngắn dạng toast.                        |

Các thư viện và script được khai báo trong [package.json](package.json).

## 3. Cấu trúc thư mục tổng quát

```text
csharp-flow-studio/
├── public/                 Tài nguyên tĩnh được trình duyệt truy cập trực tiếp
├── src/                    Mã nguồn chính của ứng dụng
│   ├── components/         Component giao diện dùng chung
│   ├── hooks/              Custom React hooks
│   ├── lib/                Dữ liệu mẫu và hàm tiện ích
│   ├── routes/             Các trang và route của ứng dụng
│   ├── router.tsx          Khởi tạo TanStack Router
│   ├── server.ts           Điểm cấu hình phía server
│   ├── start.ts            Middleware và cấu hình TanStack Start
│   ├── routeTree.gen.ts    Cây route được TanStack Router sinh tự động
│   └── styles.css          CSS toàn cục và các biến giao diện
├── package.json            Dependency và lệnh chạy dự án
├── vite.config.ts          Cấu hình Vite
├── tsconfig.json           Cấu hình TypeScript
├── eslint.config.js        Cấu hình kiểm tra chất lượng mã nguồn
├── components.json         Cấu hình component UI
└── bunfig.toml             Cấu hình cho Bun nếu dùng Bun thay npm
```

## 4. Các file cấu hình ở thư mục gốc

### `package.json`

Đây là file quan trọng nhất ở cấp dự án. Nó chứa:

- Tên và loại module của dự án.
- Danh sách thư viện cần cài.
- Các lệnh thường dùng như `dev`, `build`, `preview`, `lint` và `format`.

Các lệnh chính:

```bash
npm install       # Cài thư viện
npm run dev       # Chạy môi trường phát triển
npm run build     # Đóng gói bản production
npm run preview   # Chạy thử bản đã build
npm run lint      # Kiểm tra lỗi ESLint
npm run format    # Format toàn bộ mã nguồn
```

### `vite.config.ts`

Cấu hình Vite, tức công cụ đảm nhiệm việc chạy server phát triển và build ứng dụng.

### `tsconfig.json`

Cấu hình TypeScript, ví dụ cách kiểm tra kiểu dữ liệu, đường dẫn import và chuẩn biên dịch.

### `eslint.config.js`

Quy định các luật kiểm tra code để phát hiện lỗi hoặc cách viết không nhất quán.

### `components.json`

Cấu hình cho hệ thống component UI, đặc biệt là các component theo phong cách shadcn/Radix.

## 5. Thư mục `src`

Đây là nơi chứa gần như toàn bộ logic và giao diện ứng dụng.

### `src/router.tsx`

File này tạo router của ứng dụng:

- Tạo một `QueryClient` để TanStack Query quản lý dữ liệu và cache.
- Nạp `routeTree` chứa toàn bộ route.
- Bật khôi phục vị trí cuộn trang.
- Truyền `queryClient` vào context để các route có thể sử dụng.

Nó là cầu nối giữa danh sách route và ứng dụng React đang chạy.

### `src/start.ts`

Cấu hình phần khởi động phía server của TanStack Start:

- `errorMiddleware` bắt lỗi server chưa được xử lý và trả về trang lỗi HTTP 500.
- `csrfMiddleware` bảo vệ các server function khỏi request giả mạo từ website khác.
- `startInstance` đăng ký các middleware nói trên.

### `src/server.ts`

Đây là điểm vào dành cho phần server của ứng dụng. Nó phối hợp với TanStack Start khi ứng dụng được chạy hoặc build.

### `src/routeTree.gen.ts`

Đây là cây route được TanStack Router sinh tự động từ các file trong `src/routes`. File này giúp router biết cấu trúc URL và quan hệ cha/con giữa các trang.

Thông thường không nên sửa file này bằng tay; hãy thay đổi file route tương ứng trong `src/routes`.

### `src/styles.css`

Chứa CSS toàn cục, biến màu, kiểu chữ, nền, trạng thái sáng/tối và các class giao diện dùng chung.

## 6. Thư mục `src/routes`

Mỗi file trong thư mục này đại diện cho một route/trang. Tên file dùng quy ước của TanStack Router:

- `index.tsx`: trang mặc định của thư mục hiện tại.
- `$id.tsx`: tham số động, ví dụ `/admin/courses/:id`.
- Dấu chấm `.` thể hiện route lồng nhau, ví dụ `learn.courses.$id.tsx`.
- `__root.tsx`: route gốc của toàn bộ ứng dụng.

### Route gốc: `src/routes/__root.tsx`

Đây là lớp bao ngoài của mọi trang:

- Thiết lập tiêu đề, description và các thẻ metadata.
- Nạp CSS và font chữ.
- Khởi tạo theme sáng/tối.
- Cung cấp `QueryClientProvider` cho toàn bộ cây React.
- Render `<Outlet />`, là vị trí để trang con xuất hiện.
- Hiển thị `Toaster` cho thông báo.
- Có giao diện riêng cho lỗi 404 và lỗi runtime.

### Khu vực người học: `/learn`

Route cha nằm trong [learn.tsx](src/routes/learn.tsx). Route này bọc các trang con bằng `StudentShell`.

Các chức năng chính:

| Route                                  | Chức năng                         |
| -------------------------------------- | --------------------------------- |
| `/learn`                               | Dashboard học tập của người dùng. |
| `/learn/courses`                       | Danh sách khóa học.               |
| `/learn/courses/:id`                   | Chi tiết một khóa học.            |
| `/learn/courses/:id/lessons/:lessonId` | Nội dung một bài học.             |
| `/learn/practice`                      | Danh sách bài luyện tập.          |
| `/learn/practice/session`              | Phiên làm bài luyện tập.          |
| `/learn/tests/:testId`                 | Làm một bài kiểm tra.             |
| `/learn/analytics`                     | Thống kê và tiến độ học.          |
| `/learn/tutor`                         | Khu vực gia sư AI.                |
| `/learn/search`                        | Tìm kiếm nội dung học.            |

### Khu vực quản trị: `/admin`

Route cha nằm trong [admin.tsx](src/routes/admin.tsx). Route này bọc các trang con bằng `AdminShell`.

Các nhóm chức năng:

- **Tổng quan:** dashboard quản trị.
- **Learning content:** categories, courses, chapters, lessons và resources.
- **Question bank:** danh sách câu hỏi, trình chỉnh sửa và hàng đợi duyệt câu hỏi.
- **Tests & practice:** bài kiểm tra, test builder, practice sets và kết quả.
- **AI:** tạo nội dung, tạo câu hỏi và hàng đợi duyệt nội dung AI.
- **System:** tìm kiếm, thông báo và cài đặt.

Một số route tiêu biểu:

| Route                  | Chức năng                      |
| ---------------------- | ------------------------------ |
| `/admin/categories`    | Quản lý danh mục khóa học.     |
| `/admin/courses`       | Xem và quản lý khóa học.       |
| `/admin/courses/new`   | Tạo khóa học mới.              |
| `/admin/courses/:id`   | Xem/chỉnh sửa một khóa học.    |
| `/admin/chapters`      | Quản lý chương trong khóa học. |
| `/admin/lessons`       | Quản lý danh sách bài học.     |
| `/admin/lessons/:id`   | Chỉnh sửa chi tiết bài học.    |
| `/admin/questions`     | Quản lý ngân hàng câu hỏi.     |
| `/admin/tests/builder` | Tạo cấu trúc bài kiểm tra.     |
| `/admin/ai/content`    | Tạo nội dung học với AI.       |
| `/admin/ai/questions`  | Tạo câu hỏi với AI.            |

## 7. Thư mục `src/components`

Đây là các mảnh giao diện có thể dùng lại ở nhiều trang.

### `student-shell.tsx`

Tạo khung giao diện cho người học:

- Header cố định ở đầu trang.
- Menu Dashboard, khóa học, luyện tập, analytics, AI Tutor và Search.
- Hiển thị streak, thông báo, avatar và nút đổi theme.
- Có menu dạng drawer trên màn hình nhỏ.
- Render nội dung trang con thông qua `children`.

### `admin-shell.tsx`

Tạo khung giao diện quản trị:

- Sidebar chứa các nhóm menu quản trị.
- Có thể thu gọn sidebar để tăng không gian làm việc.
- Có menu responsive cho tablet/mobile.
- Có nút chuyển sang Student view.
- Có tìm kiếm nhanh, theme toggle và thông tin tài khoản.

### `curriculum.tsx`

Hiển thị cấu trúc chương và bài học của khóa học:

- Mở/đóng từng chương.
- Kéo thả để đổi thứ tự chương.
- Xóa chương trong giao diện hiện tại.
- Hiển thị số phút, trạng thái và nhãn bài học do AI tạo.
- Có nút thêm chương hoặc thêm bài học.

Các thao tác hiện tại chủ yếu cập nhật state ở giao diện và hiển thị toast; chưa thấy kết nối API lưu dữ liệu thật trong component này.

### `onboarding-tour.tsx`

Cung cấp tour hướng dẫn ban đầu để giới thiệu các khu vực quan trọng cho người dùng mới.

### `theme-toggle.tsx`

Cho phép chuyển theme sáng/tối và xử lý việc khởi tạo theme khi trang tải.

### `primitives.tsx`

Chứa các component nhỏ dùng chung như badge trạng thái, badge AI hoặc các thành phần hiển thị lặp lại.

### `components/ui/`

Chứa các component UI cơ bản như button, input, dialog, table, tabs, select, calendar, progress, toast và nhiều component khác.

Mục đích là chuẩn hóa giao diện, hành vi và khả năng truy cập thay vì viết lại từng nút hoặc hộp thoại ở mỗi trang.

## 8. Thư mục `src/lib`

### `mock-data.ts`

Chứa kiểu dữ liệu TypeScript và dữ liệu mẫu cho ứng dụng:

- `Category`: danh mục khóa học.
- `Course`: khóa học.
- `Chapter`: chương.
- `Lesson`: bài học.
- `Question`: câu hỏi.
- `QuestionOption`: lựa chọn của câu hỏi.
- Các kiểu trạng thái như `draft`, `review`, `approved`, `published`, `rejected`.
- Các mức độ như Beginner/Intermediate/Advanced và Easy/Medium/Hard.

Dữ liệu này giúp giao diện có nội dung để hiển thị khi chưa có backend hoặc cơ sở dữ liệu thật. Khi phát triển sản phẩm thực tế, phần này thường được thay bằng API/database.

### `utils.ts`

Chứa các hàm tiện ích dùng chung, thường dùng để ghép class CSS hoặc xử lý giá trị lặp lại.

### `error-page.ts`

Tạo HTML cho trang lỗi server 500.

### `error-capture.ts` và `lovable-error-reporting.ts`

Hỗ trợ ghi nhận và báo cáo lỗi runtime trong môi trường phát triển hoặc môi trường được kết nối với Lovable.

## 9. Luồng hoạt động của ứng dụng

```text
Trình duyệt
   ↓
TanStack Start / Vite
   ↓
router.tsx tạo router
   ↓
routeTree.gen.ts tìm route phù hợp
   ↓
__root.tsx tạo khung gốc
   ↓
learn.tsx hoặc admin.tsx chọn shell tương ứng
   ↓
Route con render nội dung trang
   ↓
Component dùng mock-data.ts và các UI component
```

Ví dụ khi mở `/admin/courses`:

1. Router nhận URL `/admin/courses`.
2. Route gốc tạo layout chung và `QueryClientProvider`.
3. Route `/admin` bọc nội dung bằng `AdminShell`.
4. Route `/admin/courses` render danh sách khóa học.
5. Trang lấy dữ liệu mẫu từ `mock-data.ts` và dùng component trong `components/ui`.

## 10. Dự án hiện đang có và chưa có gì?

### Đã có

- Giao diện người học và quản trị.
- Điều hướng nhiều trang bằng TanStack Router.
- Responsive cho desktop và mobile.
- Theme sáng/tối.
- Dữ liệu mẫu cho khóa học, chương, bài học và câu hỏi.
- Các màn hình quản lý nội dung, luyện tập, bài kiểm tra và AI.
- Middleware xử lý lỗi và CSRF cho server function.

### Cần bổ sung khi làm sản phẩm thật

- Backend API và cơ sở dữ liệu.
- Đăng nhập, phân quyền admin/student.
- Lưu khóa học, bài học, câu hỏi và kết quả vào database.
- Tích hợp dịch vụ AI thật.
- Lưu tiến độ học của từng tài khoản.
- Kiểm thử tự động và xử lý dữ liệu lỗi từ API.

## 11. Cách chạy dự án

Mở terminal tại thư mục `d:\csharp-flow-studio` rồi chạy:

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ mà terminal hiển thị, thông thường là `http://localhost:5173`.

Kiểm tra trước khi đóng gói:

```bash
npm run lint
npm run build
```

## 12. Nên đọc file nào trước?

Nếu mới làm quen dự án, nên đọc theo thứ tự sau:

1. [package.json](package.json) để biết công nghệ và lệnh chạy.
2. [src/routes/__root.tsx](src/routes/__root.tsx) để hiểu khung ứng dụng.
3. [src/router.tsx](src/router.tsx) để hiểu router.
4. [src/routes/learn.tsx](src/routes/learn.tsx) và [src/routes/admin.tsx](src/routes/admin.tsx) để hiểu hai khu vực chính.
5. [src/components/student-shell.tsx](src/components/student-shell.tsx) và [src/components/admin-shell.tsx](src/components/admin-shell.tsx) để hiểu layout.
6. [src/lib/mock-data.ts](src/lib/mock-data.ts) để hiểu cấu trúc dữ liệu.
7. Các file route cụ thể trong [src/routes](src/routes) để xem từng chức năng.
