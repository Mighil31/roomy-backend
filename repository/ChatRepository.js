import db from "../utils/database.js";

class ChatRepository {
  async getConversations(userId) {
    return db.query(
      "SELECT c.conversationId, c.created_at, u1.userId AS user1_id, u1.name AS user1_username, u2.userId AS user2_id, " +
        "u2.name AS user2_username FROM conversations c JOIN users u1 ON c.user1_id = u1.userId JOIN users u2 ON c.user2_id = " +
        "u2.userId WHERE ? IN (c.user1_id, c.user2_id);",
      [userId]
    );
  }

  async getConversationById(conversationId) {
    return db.query("SELECT * FROM conversations WHERE conversationId = ?", [
      conversationId,
    ]);
  }

  async createConversation(conversation) {
    return db.query("INSERT INTO conversations SET ?", conversation);
  }

  async getMessages(conversationId) {
    return db.query(
      "SELECT m.messageId, m.content, m.sent_at, u.userId AS senderId, u.name AS sender_username FROM " +
        "messages m JOIN users u ON m.senderId = u.userId WHERE m.conversationId = ? ORDER BY m.sent_at;",
      [conversationId]
    );
  }

  async getConversationList(userId) {
    return db.query(
      `SELECT u.userId, u.name, c.conversationId FROM users u JOIN conversations c ON u.userId = CASE WHEN c.user1_id = ${userId}` +
        ` THEN c.user2_id WHEN c.user2_id = ${userId} THEN c.user1_id END;`
    );
  }

  async createMessage(message) {
    return db.query("INSERT INTO messages SET ?", message);
  }

  async getLastMessage(message) {
    return db.query(
      "SELECT * FROM messages WHERE messageId= LAST_INSERT_ID();",
      message
    );
  }
}

export default new ChatRepository();
