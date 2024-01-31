import db from "../utils/database.js";

class PostRepository {
  async getPosts() {
    return db.query("SELECT * FROM posts");
  }

  async getFeed(userId, postId) {
    let sqlQuery = `
      SELECT 
        posts.postId, posts.userId, name, postDate, postId, gender, address1, address2, city, noOfFilledRoommates, state, country, 
        pincode, noOfRoommates, size, rent, postBody 
      FROM 
        posts, users 
      WHERE 
        posts.userId = users.userId
    `;

    if (userId) {
      sqlQuery += ` AND users.userId = ? `;
    }

    if (postId) {
      sqlQuery += ` AND posts.postId = ? `;
    }

    sqlQuery += ` ORDER BY postDate DESC`;

    return db.query(sqlQuery, userId ? [userId] : postId ? [postId] : []);
  }

  async getPostById(id) {
    return db.query("SELECT email, PostId, name FROM Posts WHERE PostId = ?", [
      id,
    ]);
  }

  async getPostByUserId(id) {
    return db.query("SELECT email, PostId, name FROM Posts WHERE userId = ?", [
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
    return db.query("UPDATE posts SET ? WHERE postId = ?", [Post, id]);
  }

  async deletePost(id) {
    return db.query("DELETE FROM posts WHERE postId = ?", [id]);
  }
}

export default new PostRepository();
