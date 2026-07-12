-- SQL file to create database and seed data for HOME SERVICE
CREATE DATABASE suachuanhacuadb;
GO
USE suachuanhacuadb;
GO

-- Tables
CREATE TABLE Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

CREATE TABLE Services (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(18,2) NULL,
    CategoryId INT NOT NULL FOREIGN KEY REFERENCES Categories(Id)
);

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NOT NULL,
    FullName NVARCHAR(200),
    Phone NVARCHAR(50),
    Address NVARCHAR(500),
    IsAdmin BIT NOT NULL DEFAULT 0
);

CREATE TABLE Bookings (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    ServiceId INT NOT NULL FOREIGN KEY REFERENCES Services(Id),
    FullName NVARCHAR(200) NOT NULL,
    Phone NVARCHAR(50) NOT NULL,
    Address NVARCHAR(500) NOT NULL,
    ScheduleDate DATETIME NOT NULL,
    Content NVARCHAR(MAX),
    Status NVARCHAR(50) NOT NULL DEFAULT 'Chờ xử lý',
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

--- Seed categories
INSERT INTO Categories (Name) VALUES
('Sửa điện'),
('Sửa nước'),
('Máy lạnh'),
('Sơn nhà'),
('Chống thấm');

-- Seed services
INSERT INTO Services (Title, Description, Price, CategoryId) VALUES
('Sửa điện cơ bản', 'Sửa ổ cắm, dây điện...', 200000, 1),
('Thay cầu dao, aptômát', 'Thay thế thiết bị điện', 150000, 1),
('Sửa ống nước rò rỉ', 'Sửa ống nước trong nhà', 250000, 2),
('Lắp đặt máy lạnh', 'Lắp đặt, nạp gas', 500000, 3),
('Sơn nội thất 1 phòng', 'Sơn tường và trần', 1200000, 4),
('Chống thấm ban công', 'Xử lý chống thấm', 800000, 5);

-- Seed admin user (password: admin123 hashed using simple hash - change after import)
INSERT INTO Users (Username, PasswordHash, FullName, Phone, Address, IsAdmin) VALUES
('admin', 'admin123', 'Admin', '0123456789', 'Hanoi', 1);
