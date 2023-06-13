import db from "../utils/database.js";

class UserRepository {
  async getUsers() {
    console.log("In UserRepository");
    return db.query("SELECT * FROM users");
  }

  async getUserById(id) {
    return db.query("SELECT email, userID, name FROM users WHERE userID = ?", [
      id,
    ]);
  }

  async getUserByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = ?", [email]);
  }

  async createUser(user) {
    return db.query("INSERT INTO users SET ?", user);
  }

  async updateUser(id, user) {
    return db.query("UPDATE users SET ? WHERE id = ?", [user, id]);
  }

  async deleteUser(id) {
    return db.query("DELETE FROM users WHERE id = ?", [id]);
  }
}

export default new UserRepository();
