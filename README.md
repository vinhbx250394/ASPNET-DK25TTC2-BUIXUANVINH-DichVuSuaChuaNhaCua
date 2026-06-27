# 🏠 DichVuSuaChuaNhaCua

**Hệ thống quản lý đặt lịch dịch vụ sửa chữa nhà cửa**

ASP.NET Core 8.0 MVC | Entity Framework Core | SQL Server Express | Cookie Authentication

---

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Sơ đồ cấu trúc đồ án](#sơ-do-cau-trúc-đồ-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Hướng dẫn cài đặt database vào SSMS](#hướng-dẫn-cài-đặt-database-vào-ssms)
- [Hướng dẫn chạy bằng Visual Studio](#hướng-dẫn-chạy-bằng-visual-studio-2026)
- [Tài khoản đăng nhập](#tài-khoản-đăng-nhập)
- [Các chức năng hiện có](#các-chức-năng-hiện-có)
- [Các route quan trọng](#các-route-quan-trọng)
- [Hướng dẫn fix lỗi thường gặp](#hướng-dẫn-fix-lỗi-thường-gặp)
- [Các link tham khảo](#các-link-tham-khảo)
- [Liên hệ](#liên-hệ)

---

## 📖 Giới thiệu

**DichVuSuaChuaNhaCua** là hệ thống website quản lý đặt lịch dịch vụ sửa chữa nhà cửa tại Hà Nội. Khách hàng có thể duyệt danh sách dịch vụ, xem chi tiết và đặt lịch trực tuyến. Quản trị viên có thể quản lý đơn hàng và danh mục dịch vụ thông qua trang quản trị.

**Các dịch vụ chính:**

- **5 danh mục:** Sửa điện, Sửa nước, Máy lạnh, Sơn nhà, Chống thấm
- **6 dịch vụ** với giá niêm yết công khai

**Đối tượng sử dụng:**

- **Khách hàng:** Đăng ký tài khoản, duyệt dịch vụ, đặt lịch sửa chữa, theo dõi đơn
- **Quản trị viên:** Quản lý đơn hàng (cập nhật trạng thái), quản lý dịch vụ (CRUD)

---

## 📁 Sơ đồ cấu trúc đồ án

```
D:\VINH\Vinh\
├── README.md                          ← Tài liệu hướng dẫn (bạn đang đọc)
├── baocao_Loi.doc                     ← Báo cáo lỗi
├── src/
│   └── src/
│       └── HomeService/               ← Dự án chính (ASP.NET Core 8.0)
│           ├── HomeService.csproj     ← File cấu hình project
│           ├── Program.cs             ← Entry point, cấu hình services
│           ├── appsettings.json       ← Connection string, cấu hình chung
│           │
│           ├── Controllers/           ← Logic xử lý yêu cầu
│           │   ├── HomeController.cs          ← Trang chủ, dịch vụ, liên hệ
│           │   ├── AccountController.cs       ← Đăng ký, đăng nhập, đăng xuất
│           │   ├── BookingController.cs       ← Đặt lịch sửa chữa
│           │   ├── AdminController.cs         ← Quản trị (đơn hàng, dịch vụ)
│           │   └── ErrorController.cs         ← Xử lý lỗi
│           │
│           ├── Models/                ← Cấu trúc dữ liệu (EF Core)
│           │   ├── AppDbContext.cs    ← DbContext + Seed data
│           │   ├── User.cs           ← Người dùng (Admin/User)
│           │   ├── Service.cs        ← Dịch vụ sửa chữa
│           │   ├── Category.cs       ← Danh mục dịch vụ
│           │   └── Booking.cs        ← Đơn đặt lịch
│           │
│           ├── Views/                 ← Giao diện Razor
│           ��   ├── Shared/
│           │   │   ├── _Layout.cshtml         ← Layout chính (sidebar + topbar)
│           │   │   └── _ViewImports.cshtml
│           │   ├── Home/
│           │   │   ├── Index.cshtml           ← Trang chủ (hero + dịch vụ nổi bật)
│           │   │   ├── Services.cshtml        ← Danh sách dịch vụ + filter
│           │   │   ├── ServiceDetails.cshtml  ← Chi tiết dịch vụ
│           │   │   └── Contact.cshtml         ← Trang liên hệ
│           │   ├── Account/
│           │   │   ├── Login.cshtml           ← Form đăng nhập
│           │   │   └── Register.cshtml        ← Form đăng ký
│           │   ├── Booking/
│           │   │   ├── Create.cshtml          ← Đặt lịch chuẩn
│           │   │   ├── CreateQuick.cshtml     ← Đặt lịch nhanh
│           │   │   └── MyBookings.cshtml      ← Lịch sử đơn của tôi
│           │   ├── Admin/
│           │   │   ├── Index.cshtml           ← Dashboard quản trị
│           │   │   ├── Services.cshtml        ← Quản lý dịch vụ
│           │   │   ├── CreateService.cshtml   ← Thêm dịch vụ mới
│           │   │   ├── EditService.cshtml     ← Sửa dịch vụ
│           │   │   └── Bookings.cshtml        ← Quản lý đơn đặt lịch
│           │   └── Error/
│           │       └── Error.cshtml           ← Trang lỗi
│           │
│           ├── Migrations/            ← EF Core migrations
│           │   └── 20260523102424_InitialCreate.cs
│           │
│           ├── wwwroot/               ← Static files
│           │   ├── css/
│           │   │   ├── site.css       ← Design system chính
│           │   │   └── chatbot.css    ← Styles cho chatbot widget
│           │   ├── js/
│           │   │   └── chatbot.js     ← Chatbot rule-based (tiếng Việt)
│           │   └── fonts/             ← Font TTF local (fallback)
│           │
│           └── Properties/
│               └── launchSettings.json  ← Cấu hình URL chạy server
│
├── Progress_Report/                   ← Báo cáo tiến độ
│   ├── README.md
│   ├── home_service.sql
│   └── Chay-Day-Du-Chu.bat
│
└── thesis/                            ← Luận văn
```

**Kiến trúc ứng dụng:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Browser    │◄──►│  ASP.NET Core│◄──►│  SQL Server  │
│  (HTML/CSS/  │    │  Controllers │    │   Express    │
│   JavaScript)│    │  + Views     │    │  (EF Core)   │
└──────────────┘    └──────────────┘    └──────────────┘
                         │
                    ┌────┴────┐
                    │  Cookie │
                    │  Auth   │
                    └─────────┘
```

---

## 💻 Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| **Framework** | ASP.NET Core 8.0 (MVC Pattern) |
| **ORM** | Entity Framework Core 8.0.8 (Code-First) |
| **Database** | SQL Server Express (Local Instance) |
| **Authentication** | Cookie Authentication (Custom) |
| **Frontend** | Bootstrap 5.3.2, Bootstrap Icons 1.11.3 |
| **Font** | Be Vietnam Pro (Google Fonts CDN) |
| **Chatbot** | Vanilla JavaScript (Rule-based, tiếng Việt) |
| **IDE** | Visual Studio 2022 / 2026 |

---

## ⚙️ Yêu cầu hệ thống

- **Visual Studio 2022 / 2026** (có cài ASP.NET and web development workload)
- **SQL Server Express** (instance `SQLEXPRESS`)
- **SQL Server Management Studio (SSMS)** (để quản lý database)
- **.NET 8.0 SDK** (cài cùng Visual Studio)
- **Windows 10/11**

---

## 🗄️ Hướng dẫn cài đặt database vào SSMS

### Bước 1: Mở SSMS

- Mở **SQL Server Management Studio** (SSMS)
- Kết nối đến instance: `.\SQLEXPRESS` (Windows Authentication)

### Bước 2: Tạo database thủ công (nếu chưa có)

```sql
-- Tạo database với collation hỗ trợ tiếng Việt
CREATE DATABASE suachuanhacuadb
COLLATE Vietnamese_CI_AS;
```

### Bước 3: Tạo database bằng Migration (khuyến nghị)

Thay vì tạo thủ công, hãy dùng EF Core Migration (xem phần chạy Visual Studio bên dưới):

```bash
cd src/src/HomeService
dotnet ef database update
```

Lệnh này sẽ tự động:
- Tạo database `suachuanhacuadb` (nếu chưa có)
- Tạo tất cả bảng: Categories, Services, Users, Bookings
- Seed 5 danh mục, 6 dịch vụ, 1 tài khoản admin

### Bước 4: Kiểm tra database

Mở SSMS, query thử:

```sql
USE suachuanhacuadb;
GO

-- Xem danh mục
SELECT * FROM Categories;

-- Xem dịch vụ
SELECT * FROM Services;

-- Xem người dùng
SELECT * FROM Users;
```

**Lưu ý:** Nếu query trả về tiếng Việt bị lỗi font (hiển thị `S?a` thay vì `Sửa`), đó là lỗi hiển thị của sqlcmd/SSMS console. Dữ liệu trong database vẫn đúng (nvarchar = Unicode). Kiểm tra bằng cách mở trang web trong browser.

---

## 🚀 Hướng dẫn chạy bằng Visual Studio 2022 / 2026

### Bước 1: Mở solution

1. Mở **Visual Studio 2022 / 2026**
2. **File → Open → Project/Solution**
3. Chọn file: `D:\VINH\Vinh\src\src\HomeService\HomeService.csproj`
4. Chờ Visual Studio restore packages (tự động)

### Bước 2: Restore NuGet Packages

Nếu chưa tự restore:

```
Tools → NuGet Package Manager → Package Manager Console
```

```powershell
dotnet restore
```

Hoặc right-click solution → **Restore NuGet Packages**

### Bước 3: Chạy EF Core Migration

Mở **Package Manager Console** (Tools → NuGet Package Manager):

```powershell
dotnet ef database update
```

Hoặc dùng terminal:

```bash
cd D:\VINH\Vinh\src\src\HomeService
dotnet ef database update
```

### Bước 4: Chạy dự án

1. Nhấn **F5** hoặc **Ctrl + F5** (Run Without Debugging)
2. Trình duyệt mở tự động: `https://localhost:5001/`
3. Hoặc truy cập thủ công: `http://localhost:5000/`

### Bước 5: Kiểm tra

- Trang chủ hiển thị đúng tiếng Việt
- Click "Dịch vụ" → thấy 6 dịch vụ với tên tiếng Việt
- Click chatbot icon góc phải → chatbot hoạt động

---

## 🔑 Tài khoản đăng nhập

### Tài khoản Quản trị viên (Admin)

| Thông tin | Giá trị |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123` |
| **Quyền** | Quản trị toàn bộ (CRUD dịch vụ, quản lý đơn hàng) |

### Tài khoản Nhân viên / Khách hàng

- Đăng ký mới tại trang **Đăng ký** (`/Account/Register`)
- Sau khi đăng ký, tài khoản có quyền **User** (đặt lịch, xem đơn của mình)

---

## ✅ Các chức năng hiện có

### 🏠 Trang chủ (`/`)

- Hero section giới thiệu dịch vụ
- Hiển thị 6 dịch vụ nổi bật
- Section "Tại sao chọn chúng tôi" (Phản hồi nhanh, Bảo hành, Giá minh bạch, Thợ chuyên nghiệp)
- Quy trình 4 bước đặt dịch vụ
- Đánh giá khách hàng
- CTA đăng ký

### 📋 Trang Dịch vụ (`/Home/Services`)

- Hiển thị tất cả dịch vụ dạng card
- **Filter theo danh mục** (Sửa điện, Sửa nước, Máy lạnh, Sơn nhà, Chống thấm)
- Xem chi tiết từng dịch vụ (`/Home/ServiceDetails/{id}`)

### 🔐 Tài khoản (`/Account`)

- **Đăng nhập** (`/Account/Login`)
- **Đăng ký** (`/Account/Register`)
- **Đăng xuất** (`/Account/Logout`)
- Cookie Authentication (session 8 giờ)

### 📅 Đặt lịch (`/Booking`)

- **Đặt lịch chuẩn** (`/Booking/Create?serviceId=X`) — chọn dịch vụ cụ thể
- **Đặt lịch nhanh** (`/Booking/CreateQuick`) — chọn dịch vụ + nhập thông tin trong 1 form
- **Xem đơn của tôi** (`/Booking/MyBookings`) — lịch sử đặt lịch

### 👑 Quản trị (`/Admin`) — Chỉ Admin mới truy cập được

- **Dashboard** (`/Admin/Index`) — tổng quan đơn hàng
- **Quản lý dịch vụ** (`/Admin/Services`) — danh sách, thêm mới, sửa, xóa
- **Quản lý đơn hàng** (`/Admin/Bookings`) — cập nhật trạng thái (Chờ xử lý → Đang xử lý → Hoàn thành)

### 💬 Chatbot

- Widget chatbot ở góc phải màn hình
- Trả lời tự động 15+ câu hỏi thường gặp (giá, đặt lịch, bảo hành, giờ mở cửa...)
- Hỗ trợ tiếng Việt, bỏ dấu khi so sánh keyword
- Quick reply buttons gợi ý nhanh

---

## 🔗 Các route quan trọng

### Công khai (Không cần đăng nhập)

| Route | Mô tả |
|---|---|
| `GET /` | Trang chủ |
| `GET /Home/Services` | Danh sách dịch vụ |
| `GET /Home/Services?category=Sửa điện` | Lọc theo danh mục |
| `GET /Home/ServiceDetails/1` | Chi tiết dịch vụ |
| `GET /Home/Contact` | Trang liên hệ |
| `GET /Account/Login` | Đăng nhập |
| `GET /Account/Register` | Đăng ký |
| `GET /Account/Logout` | Đăng xuất |

### Yêu cầu đăng nhập (User / Admin)

| Route | Mô tả |
|---|---|
| `GET /Booking/Create?serviceId=1` | Đặt lịch cho dịch vụ |
| `GET /Booking/CreateQuick` | Đặt lịch nhanh |
| `GET /Booking/MyBookings` | Đơn hàng của tôi |

### Yêu cầu quyền Admin

| Route | Mô tả |
|---|---|
| `GET /Admin/Index` | Dashboard quản trị |
| `GET /Admin/Services` | Quản lý dịch vụ |
| `GET /Admin/CreateService` | Thêm dịch vụ mới |
| `GET /Admin/EditService/1` | Sửa dịch vụ |
| `GET /Admin/DeleteService/1` | Xóa dịch vụ |
| `GET /Admin/Bookings` | Quản lý đơn hàng |
| `GET /Admin/UpdateStatus/1?status=Hoàn thành` | Cập nhật trạng thái |

---

## 🐛 Hướng dẫn fix lỗi thường gặp

### Lỗi 1: SQL Server không tìm thấy instance (Error 26)

**Triệu chứng:**
```
A network-related or instance-specific error occurred
(provider: SQL Network Interfaces, error: 26 - Error Locating Server/Instance Specified)
```

**Nguyên nhân:** SQL Server Express không chạy hoặc sai tên instance.

**Cách fix:**

1. Kiểm tra SQL Server Express đang chạy:
```powershell
sc query MSSQL$SQLEXPRESS
```
Nếu `STATE: 1 STOPPED`, chạy lại:
```powershell
net start MSSQL$SQLEXPRESS
```

2. Kiểm tra connection string trong `appsettings.json`:
```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=suachuanhacuadb;..."
```
**Lưu ý:** `.\SQLEXPRESS` hoặc `(local)\\SQLEXPRESS` đều đúng. **Không** dùng `local\SQLEXPRESS`.

3. Test kết nối bằng sqlcmd:
```powershell
sqlcmd -S ".\SQLEXPRESS" -Q "SELECT 1" -C
```

---

### Lỗi 2: Tiếng Việt hiển thị lỗi font (dấu bị mất)

**Triệu chứng:** Trang web hiển thị `D?ch V?` thay vì `Dịch vụ`.

**Nguyên nhân:**
- Database có collation sai (`SQL_Latin1_General_CP1_CI_AS`)
- Browser cache cũ
- File font `.woff2` giả trong thư mục fonts

**Cách fix:**

**Bước 1:** Xóa và tạo lại database với collation đúng:
```sql
USE master;
ALTER DATABASE suachuanhacuadb SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE suachuanhacuadb;
CREATE DATABASE suachuanhacuadb COLLATE Vietnamese_CI_AS;
```

**Bước 2:** Chạy lại migration:
```bash
cd src/src/HomeService
dotnet ef database update
```

**Bước 3:** Mở browser → **Ctrl + F5** (hard refresh) để xóa cache.

---

### Lỗi 3: Port 5001 đã bị chiếm

**Triệu chứng:**
```
Failed to bind to address https://localhost:5001: address already in use
```

**Cách fix:**

1. Đổi port trong `Properties/launchSettings.json`:
```json
"applicationUrl": "https://localhost:5002;http://localhost:5001"
```

2. Hoặc tìm và tắt process đang chiếm port:
```powershell
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

---

### Lỗi 4: NuGet Package restore thất bại

**Cách fix:**

1. Xóa thư mục `obj` và `bin` trong project:
```powershell
cd D:\VINH\Vinh\src\src\HomeService
Remove-Item -Recurse -Force obj, bin
```

2. Restore lại:
```powershell
dotnet restore
```

---

### Lỗi 5: Migration chưa chạy / Database chưa tồn tại

**Triệu chứng:**
```
Invalid object name 'Services'
```

**Cách fix:**

```bash
cd src/src/HomeService
dotnet ef database update
```

Hoặc nếu muốn tạo lại migration từ đầu:
```bash
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

### Lỗi 6: Trang trắng sau khi chạy (không có lỗi)

**Cách fix:**

1. Kiểm tra browser console (F12 → Console) xem có lỗi JS không
2. Kiểm tra URL đúng là `https://localhost:5001/`
3. Thử đổi sang HTTP: `http://localhost:5000/`
4. Clear cache browser

---

### Lỗi 7: Chatbot không hiển thị

**Cách fix:**

1. Kiểm tra Console (F12) xem có lỗi load `chatbot.js` hoặc `chatbot.css` không
2. Đảm bảo thư mục `wwwroot/js/chatbot.js` và `wwwroot/css/chatbot.css` tồn tại
3. Hard refresh: **Ctrl + F5**

---

## 📚 Các link tham khảo

### Tài liệu chính thức

| Link | Mô tả |
|---|---|
| [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/) | Tài liệu chính thức ASP.NET Core |
| [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) | Tài liệu EF Core |
| [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/) | Tài liệu Bootstrap |
| [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-editions-express) | Tải SQL Server Express |

### NuGet Packages

| Package | Phiên bản | Link |
|---|---|---|
| Microsoft.EntityFrameworkCore.SqlServer | 8.0.8 | [NuGet](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/8.0.8) |
| Microsoft.EntityFrameworkCore.Design | 8.0.8 | [NuGet](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Design/8.0.8) |

### Font & Icons

| Resource | Link |
|---|---|
| Be Vietnam Pro (Google Fonts) | [fonts.google.com](https://fonts.google.com/specimen/Be+Vietnam+Pro) |
| Bootstrap Icons | [icons.getbootstrap.com](https://icons.getbootstrap.com/) |

### Font fallback (Local TTF)

Trong thư mục `wwwroot/fonts/` có các file font `.ttf` (weight 300-800) để dùng khi Google CDN không truy cập được.

---

## 📞 Liên hệ

- **Email:** contact@DichVuSuaChuaNhaCua.vn
- **Hotline:** 0123 456 789
- **Địa chỉ:** Cầu Giấy, Hà Nội

---

> **DichVuSuaChuaNhaCua v1.0** — ASP.NET Core 8.0 + Entity Framework Core + SQL Server Express
