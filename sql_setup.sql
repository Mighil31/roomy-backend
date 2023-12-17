CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  userId int NOT NULL,
  postID INT AUTO_INCREMENT PRIMARY KEY,
  gender ENUM('male', 'female', 'any') NOT NULL,
  address1 VARCHAR(255) NOT NULL,
  address2 VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  noOfRoommates INT NOT NULL,
  noOfFilledRoommates INT NOT NULL DEFAULT 0,
  size ENUM('1bhk', '2bhk', '3bhk', '4bhk', '5bhk', 'Other') NOT NULL,
  rent DECIMAL(10, 2) NOT NULL,
  postBody TEXT NOT NULL,
  postDate DATE DEFAULT (CURRENT_DATE)
  FOREIGN KEY (userId) REFERENCES users(id)
);
