# DichVuSuaChuaNhaCua — Dịch vụ sửa chữa nhà cửa

Website quản lý đặt lịch dịch vụ sửa chữa nhà cửa tại Hà Nội. Khách hàng chọn dịch vụ, đặt lịch online. Quản trị viên quản lý đơn hàng và danh mục dịch vụ.

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Công nghệ](#công-nghệ)
- [Cài đặt](#cài-đặt)
- [Cấu trúc project](#cấu-trúc-project)
- [Tài khoản mặc định](#tài-khoản-mặc-định)
- [Các trang quan trọng](#các-trang-quan-trọng)
- [Chức năng hiện có](#chức-năng-hiện-có)
- [Phát triển thêm](#phát-triển-thêm)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)

---

## Giới thiệu

DichVuSuaChuaNhaCua là hệ thống đặt lịch dịch vụ sửa chữa nhà cửa, bao gồm:

- **6 dịch vụ** thuộc **5 danh mục**: Sửa điện, Sửa nước, Máy lạnh, Sơn nhà, Chống thấm
- **Khách hàng**: đăng ký, đăng nhập, xem dịch vụ, đặt lịch, theo dõi đơn
- **Quản trị viên**: quản lý đơn hàng (cập nhật trạng thái), quản lý dịch vụ (CRUD)

---

## Công nghệ

| Layer | Công nghệ |
|---|---|
| Backend | ASP.NET Core 8.0 (MVC) |
| ORM | Entity Framework Core 8.0 |
| Database | SQL Server Express (`local\SQLEXPRESS`) |
| Frontend | Razor Pages + Bootstrap 5.3 + Bootstrap Icons |
| Font | Be Vietnam Pro (Google Fonts) |
| Auth | Cookie Authentication |

---

## Cài đặt

### 1. Yêu cầu

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) — cài với instance name `SQLEXPRESS`
- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

### 2. Cài SQL Server

1. Tải và cài **SQL Server Express**
2. Mở **SQL Server Configuration Manager** → **SQL Server Network Configuration** → **Protocols for SQLEXPRESS**
3. Enable **TCP/IP** → đặt port `1433` → restart service **SQL Server (SQLEXPRESS)**
4. Mở **SSMS**, kết nối `local\SQLEXPRESS`, tạo database:

```sql
CREATE DATABASE suachuanhacuadb;
GO
```

### 3. Cấu hình Connection String

Sửa file `src/HomeService/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=local\\SQLEXPRESS;Database=suachuanhacuadb;Integrated Security=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
  }
}
```

> **Lưu ý:** Nếu SQL Server cài trên máy khác hoặc dùng LocalDB, thay server name tương ứng. Kiểm tra server name trong SSMS: right-click server → Properties → General → Server name.

### 4. Chạy Migration & Seed Data

```bash
cd src/HomeService
dotnet ef database update
```

Tạo bảng và seed sẵn: 5 danh mục, 6 dịch vụ, tài khoản admin.

### 5. Chạy ứng dụng

```bash
cd src/HomeService
dotnet run
```

Mở trình duyệt: **http://localhost:5000**

---

## Cấu trúc project

```
home-service/
├── src/
│   └── HomeService/
│       ├── Controllers/
│       │   ├── HomeController.cs       # Trang chủ, dịch vụ, chi tiết, liên hệ
│       │   ├── AccountController.cs    # Đăng nhập, đăng ký, đăng xuất
│       │   ├── BookingController.cs    # Tạo đơn, đơn của tôi
│       │   ├── AdminController.cs      # Dashboard, quản lý đơn & dịch vụ
│       │   └── ErrorController.cs
│       ├── Models/
│       │   ├── User.cs                # Người dùng (khách + admin)
│       │   ├── Category.cs             # Danh mục dịch vụ
│       │   ├── Service.cs              # Dịch vụ (thuộc danh mục)
│       │   ├── Booking.cs              # Đơn đặt dịch vụ
│       │   └── AppDbContext.cs         # EF Core DbContext + seed data
│       ├── Views/
│       │   ├── Home/                   # Index, Services, ServiceDetails, Contact
│       │   ├── Account/                # Login, Register
│       │   ├── Booking/                # Create, CreateQuick, MyBookings
│       │   ├── Admin/                  # Index, Bookings, Services, CreateService, EditService
│       │   └── Shared/                 # _Layout.cshtml, _ViewImports.cshtml
│       ├── wwwroot/
│       │   ├── css/site.css
│       │   └── fonts/                  # Be Vietnam Pro font files
│       ├── Migrations/
│       ├── Program.cs
│       └── appsettings.json
└── README.md
```

---

## Tài khoản mặc định

| Role | Username | Password |
|---|---|---|
| **Quản trị viên (Admin)** | `admin` | `admin123` |
| Khách hàng | Tự đăng ký | Tự đặt |

> Tài khoản admin có quyền truy cập trang `/Admin/**`

---

## Các trang quan trọng

### Khách hàng

### Quản trị viên (Admin)

| Trang | URL |
|---|---|
| Dashboard | `/Admin` |
| Quản lý đơn | `/Admin/Bookings` |
| Quản lý dịch vụ | `/Admin/Services` |
| Thêm dịch vụ | `/Admin/CreateService` |
| Sửa dịch vụ | `/Admin/EditService/{id}` |

---

## Chức năng hiện có

### Khách hàng
- Xem danh sách dịch vụ, lọc theo 5 danh mục: Sửa điện, Sửa nước, Máy lạnh, Sơn nhà, Chống thấm
- Xem chi tiết dịch vụ (hình ảnh, giá, mô tả)
- Đăng ký / đăng nhập tài khoản
- Tạo đơn đặt dịch vụ (chọn dịch vụ, nhập thông tin, chọn ngày hẹn)
- Tạo đơn nhanh trong 1 form duy nhất
- Xem lịch sử đơn đã đặt
- Theo dõi trạng thái đơn: Chờ xử lý → Đang sửa → Hoàn thành

### Quản trị viên
- Dashboard tổng quan với danh sách tất cả đơn
- Cập nhật trạng thái đơn hàng (Chờ xử lý / Đang sửa / Hoàn thành)
- Thêm dịch vụ mới (tiêu đề, danh mục, giá, mô tả)
- Chỉnh sửa dịch vụ hiện có
- Xóa dịch vụ

---

## Phát triển thêm

### Cao
- **Thông báo SMS/Email** — xác nhận đơn qua Twilio SMS, SendGrid Email
- **Thanh toán online** — tích hợp VNPay, MoMo, ZaloPay
- **Đánh giá & phản hồi** — khách đánh giá sau khi hoàn thành đơn
- **Quản lý thợ** — phân công thợ, theo dõi tiến độ
- **Thống kê dashboard** — biểu đồ số đơn, doanh thu, dịch vụ phổ biến

### Trung bình
- **Upload hình ảnh dịch vụ** — lưu ảnh vào DB/blob thay vì URL cố định
- **Xuất hóa đơn PDF** — phiếu bảo hành, hóa đơn dịch vụ
- **Phân trang** — phân trang danh sách dịch vụ, đơn hàng
- **Lọc & tìm kiếm nâng cao** — tìm đơn theo ngày, trạng thái, khách hàng

### Nhỏ
- **Quên mật khẩu** — reset qua email
- **Avatar người dùng** — upload ảnh profile
- **Đa ngôn ngữ** — hỗ trợ tiếng Anh
- **PWA** — chuyển thành Progressive Web App

---

## Xử lý lỗi thường gặp

### Lỗi kết nối SQL Server

```
SqlException: A network-related or instance-specific error occurred while
establishing a connection to SQL Server.
```

**Nguyên nhân:** Connection string sai server name hoặc SQL Server chưa bật TCP/IP.

**Cách fix:**
1. Mở **SQL Server Configuration Manager**
2. **SQL Server Network Configuration** → **Protocols for SQLEXPRESS**
3. Enable **TCP/IP** → port `1433` → restart service
4. Sửa `Server=` trong `appsettings.json` đúng server name
5. Nếu dùng LocalDB: `Server=(localdb)\\mssqllocaldb`

### Lỗi font tiếng Việt (chữ bị ? hoặc ký tự lạ)

Ví dụ: `Ch?ng th?m` thay vì `Chống thấm`

**Nguyên nhân:** Dữ liệu trong SQL Server bị lưu sai encoding (UTF-8 bytes đọc nhầm sang Windows-1252).

**Cách fix — chạy SQL trong SSMS:**

```sql
UPDATE Services SET Title = N'Chống thấm ban công', Description = N'Xử lý chống thấm' WHERE Id = 6;
UPDATE Services SET Title = N'Sơn nội thất 1 phòng', Description = N'Sơn tường và trần' WHERE Id = 5;
UPDATE Services SET Title = N'Lắp đặt máy lạnh', Description = N'Lắp đặt, nạp gas' WHERE Id = 4;
UPDATE Services SET Title = N'Sửa ống nước rò rỉ', Description = N'Sửa ống nước trong nhà' WHERE Id = 3;
UPDATE Services SET Title = N'Thay cầu dao, aptômát', Description = N'Thay thế thiết bị điện' WHERE Id = 2;
UPDATE Services SET Title = N'Sửa điện cơ bản', Description = N'Sửa ổ cắm, dây điện...' WHERE Id = 1;

UPDATE Categories SET Name = N'Chống thấm' WHERE Id = 5;
UPDATE Categories SET Name = N'Sơn nhà' WHERE Id = 4;
UPDATE Categories SET Name = N'Máy lạnh' WHERE Id = 3;
UPDATE Categories SET Name = N'Sửa nước' WHERE Id = 2;
UPDATE Categories SET Name = N'Sửa điện' WHERE Id = 1;
```

### Lỗi view not found

```
InvalidOperationException: The view 'Bookings' was not found.
```

**Nguyên nhân:** Thiếu file `.cshtml` cho action tương ứng.

**Cách fix:** Tạo file view đúng đường dẫn. Ví dụ action `Bookings` trong `AdminController` cần file `Views/Admin/Bookings.cshtml`.

### Lỗi 401/403 khi truy cập Admin

**Nguyên nhân:** Chưa đăng nhập hoặc tài khoản không có role Admin.

**Cách fix:**
1. Đăng nhập bằng `admin` / `admin123`
2. Kiểm tra `IsAdmin = 1` trong bảng `Users`:

```sql
SELECT * FROM Users WHERE Username = 'admin';
UPDATE Users SET IsAdmin = 1 WHERE Username = 'admin';
```

### Lỗi migration conflict

```
There is already an object named '...' in the database.
```

**Cách fix:**

```bash
cd src/HomeService
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Lỗi build (syntax error)

```
Type or namespace definition, or end-of-file expected
```

**Nguyên nhân:** Thường do thiếu dấu `}` đóng hoặc `using` statements bị cắt.

**Cách fix:** Mở file báo lỗi, kiểm tra dòng được highlight, đặc biệt cuối file.

### Lỗi font Be Vietnam Pro không hiển thị

**Cách fix:**
1. Nhấn **Ctrl + Shift + R** (hard refresh) hoặc mở tab ẩn danh
2. Kiểm tra DevTools → Network → tìm file `.ttf` có status 200

---

## Database Schema

```
Users
├── Id (PK, int)
├── Username (nvarchar)
├── PasswordHash (nvarchar)
├── FullName (nvarchar)
├── Phone (nvarchar)
├── Address (nvarchar)
└── IsAdmin (bit)

Categories
├── Id (PK, int)
└── Name (nvarchar)

Services
├── Id (PK, int)
├── Title (nvarchar)
├── Description (nvarchar)
├── Price (decimal)
└── CategoryId (FK → Categories.Id)

Bookings
├── Id (PK, int)
├── UserId (FK → Users.Id)
├── ServiceId (FK → Services.Id)
├── FullName (nvarchar)
├── Phone (nvarchar)
├── Address (nvarchar)
├── ScheduleDate (datetime)
├── Content (nvarchar)
├── Status (nvarchar)   -- "Chờ xử lý" | "Đang sửa" | "Hoàn thành"
└── CreatedAt (datetime)
```

---

> **DichVuSuaChuaNhaCua v1.0** — ASP.NET Core 8.0 + Entity Framework Core + SQL Server Express
