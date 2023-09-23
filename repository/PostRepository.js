import db from "../utils/database.js";

class PostRepository {
  async getPosts() {
    return db.query("SELECT * FROM posts");
  }

  async getPostById(id) {
    return db.query("SELECT email, PostId, name FROM Posts WHERE PostId = ?", [
      id,
    ]);
  }

  async getPostByEmail(email) {
    return db.query("SELECT * FROM Posts WHERE email = ?", [email]);
  }

  async createPost(post) {
    return db.query("INSERT INTO posts SET ?", post);
  }

  async updatePost(id, Post) {
    return db.query("UPDATE Posts SET ? WHERE id = ?", [Post, id]);
  }

  async deletePost(id) {
    return db.query("DELETE FROM Posts WHERE id = ?", [id]);
  }
}

export default new PostRepository();