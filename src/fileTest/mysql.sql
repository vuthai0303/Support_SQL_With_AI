-- Xóa các bảng nếu tồn tại để tránh lỗi
DROP TABLE IF EXISTS COURSE;
DROP TABLE IF EXISTS EMPLOYEE;

-- Tạo bảng EMPLOYEE
CREATE TABLE EMPLOYEE (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  hire_date DATE NOT NULL,
  department VARCHAR(50),
  position VARCHAR(50),
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tạo bảng COURSE, với khóa ngoại liên kết đến EMPLOYEE (giả sử instructor_id trỏ đến employee_id)
CREATE TABLE COURSE (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  instructor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES EMPLOYEE(employee_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Chèn dữ liệu mẫu vào bảng EMPLOYEE
INSERT INTO EMPLOYEE (first_name, last_name, email, phone, hire_date, department, position, salary)
VALUES
  ('Nguyen', 'Van A', 'nguyenvana@example.com', '0123456789', '2020-01-15', 'IT', 'Developer', 1500.00),
  ('Tran', 'Thi B', 'tranthib@example.com', '0987654321', '2019-03-17', 'HR', 'HR Manager', 2000.00),
  ('Le', 'Van C', 'levanc@example.com', '0912345678', '2021-06-22', 'Finance', 'Accountant', 1800.00),
  ('Pham', 'Thi D', 'phamthid@example.com', '0901234567', '2018-11-05', 'Marketing', 'Marketing Specialist', 1700.00),
  ('Hoang', 'Van E', 'hoangvane@example.com', '0934567890', '2022-02-10', 'IT', 'System Analyst', 1600.00);

-- Chèn dữ liệu mẫu vào bảng COURSE
INSERT INTO COURSE (course_name, description, start_date, end_date, instructor_id)
VALUES
  ('Introduction to Programming', 
   'This course covers the basics of programming using Python.', 
   '2023-01-10', '2023-04-10', 1),
  ('Advanced SQL', 
   'Deep dive into complex queries and database optimization techniques.', 
   '2023-02-15', '2023-05-15', 3),
  ('Project Management', 
   'Fundamentals of managing software projects effectively.', 
   '2023-03-01', '2023-06-01', 2),
  ('Digital Marketing', 
   'Strategies and tools for promoting brands in the digital space.', 
   '2023-04-05', '2023-07-05', 4),
  ('Financial Analysis', 
   'Techniques for analyzing financial statements and budgeting.', 
   '2023-05-10', '2023-08-10', 3);
