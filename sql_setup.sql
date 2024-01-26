CREATE TABLE users (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255) DEFAULT NULL
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
  postDate DATE DEFAULT (CURRENT_DATE),
  FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE conversations (
  conversationId INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user1_id INT NOT NULL,
  user2_id INT NOT NULL,

  FOREIGN KEY (user1_id) REFERENCES users(userId),
  FOREIGN KEY (user2_id) REFERENCES users(userId)
);

ALTER TABLE conversations ADD UNIQUE unique_index(user1_id, user2_id);

CREATE TABLE messages (
    messageId INT PRIMARY KEY AUTO_INCREMENT,
    conversationId INT NOT NULL,
    senderId INT NOT NULL,
    content TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (conversationId) REFERENCES conversations(conversationId),
    FOREIGN KEY (senderId) REFERENCES users(userId)
);
