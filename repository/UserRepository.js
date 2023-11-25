import db from "../utils/database.js";

class UserRepository {
  async getUsers() {
    return db.query("SELECT * FROM users");
  }

  async getUserById(id) {
    return db.query("SELECT email, userId, name FROM users WHERE userId = ?", [
      id,
    ]);
  }

  async getUserByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = ?", [email]);
  }

  async getUserByRefreshToken(token) {
    return db.query("SELECT * FROM users WHERE refresh_token = ?", [token]);
  }

  async deleteRefreshToken(userId) {
    return db.query("update users set refresh_token = NULL where userId = ?", [
      userId,
    ]);
  }

  async createUser(user) {
    return db.query("INSERT INTO users SET ?", user);
  }

  async updateUser(id, user) {
    return db.query("UPDATE users SET ? WHERE userId = ?", [user, id]);
  }

  async addRefreshToken(token, id) {
    return db.query("UPDATE users SET refresh_token = ? WHERE userId = ?", [
      token,
      id,
    ]);
  }

  async deleteUser(id) {
    return db.query("DELETE FROM users WHERE id = ?", [id]);
  }
}

export default new UserRepository();
