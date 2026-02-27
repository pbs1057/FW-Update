USE dashboard;

CREATE TABLE IF NOT EXISTS stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total_user INT NOT NULL,
  revenue DECIMAL(10, 2) NOT NULL,
  active_project INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO stats (total_user, revenue, active_project) 
VALUES (120, 450000, 37);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO posts (title, content, author) 
VALUES 
  ('첫 번째 게시글', '안녕하세요! 첫 게시글입니다.', '관리자'),
  ('두 번째 게시글', 'Vue.js 게시판 테스트입니다.', '사용자1');