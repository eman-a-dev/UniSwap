-- =============================================
-- UniSwap Database Setup
-- Run this in MySQL Workbench or terminal:
--   mysql -u root -p < database-setup.sql
-- =============================================

CREATE DATABASE IF NOT EXISTS uniswap;
USE uniswap;

-- =============================================
-- users table
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),           -- bcrypt hashed (NULL for Google users)
  confirmpassword VARCHAR(255),    -- deprecated, kept for compatibility
  google_id VARCHAR(255),
  profile_image TEXT,
  is_google_user TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- categories table
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Seed categories
INSERT IGNORE INTO categories (id, name) VALUES
  (1, 'Books'),
  (2, 'Gadgets'),
  (3, 'Academic Essentials'),
  (4, 'Design Tools');

-- =============================================
-- items table
-- =============================================
CREATE TABLE IF NOT EXISTS items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INT,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  price_type ENUM('free', 'paid') DEFAULT 'free',
  price DECIMAL(10, 2),
  image_url TEXT,
  listing_type ENUM('sell', 'exchange', 'borrow') DEFAULT 'sell',
  status ENUM('available', 'reserved', 'sold') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- If you already have an items table, run these to add new columns:
-- ALTER TABLE items ADD COLUMN IF NOT EXISTS listing_type ENUM('sell','exchange','borrow') DEFAULT 'sell';
-- ALTER TABLE items ADD COLUMN IF NOT EXISTS status ENUM('available','reserved','sold') DEFAULT 'available';
-- ALTER TABLE items ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- =============================================
-- wishlist table (NEW)
-- =============================================
CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  item_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_wishlist (user_email, item_id),
  FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);
