import PostRepository from "../repository/PostRepository.js";

export const createPost = async (req, res) => {
  // console.log(req.user);
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
    userId: req.user.userId,
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
  // console.log(post);

  try {
    const [rows, field] = await PostRepository.createPost(post);
    return res.status(201).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};

export const getFeed = async (req, res) => {
  try {
    // console.log("Get feed");
    const [rows, field] = await PostRepository.getFeed();
    // console.log("rows");

    return res.status(201).json(rows);
  } catch (error) {}
};
