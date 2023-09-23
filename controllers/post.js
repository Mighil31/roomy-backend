import PostRepository from "../repository/PostRepository.js";

export const createPost = async (req, res) => {
  const {
    gender,
    address1,
    address2,
    city,
    state,
    country,
    pincode,
    noOfRoommates,
    size,
    rent,
    postBody,
  } = req.body;

  // Create a post object
  const post = {
    gender,
    address1,
    address2,
    city,
    state,
    country,
    pincode,
    noOfRoommates,
    size,
    rent,
    postBody,
  };

  try {
    const [rows, field] = await PostRepository.createPost(post);
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Database issue" }] });
  }
};
