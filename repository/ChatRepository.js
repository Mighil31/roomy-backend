import db from "../utils/database.js";

class ChatRepository {
  async getConversations() {
    return db.query(
      "SELECT DISTINCT u.user_id, u.username FROM users u JOIN conversations c ON" +
        " u.user_id = CASE WHEN c.user1_id = :userId THEN c.user2_id WHEN c.user2_id = :userId THEN c.user1_id;"
    );
  }

  async createConversation(conversation) {
    return db.query("INSERT INTO conversations SET ?", conversation);
  }
}

export default new ChatRepository();
