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
      `SELECT u.userId, u.name FROM users u WHERE u.userId IN (SELECT c.user1_id FROM conversations c WHERE ` +
        `c.user2_id = ${userId} UNION SELECT c.user2_id FROM conversations c WHERE c.user1_id = ${userId} ) ORDER BY u.name;`
    );
  }

  async createMessage(message) {
    return db.query("INSERT INTO messages SET ?", message);
  }
}

export default new ChatRepository();
