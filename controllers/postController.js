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
    const [rows, field] = await PostRepository.getFeed(
      req.query?.userId,
      req.query?.postId
    );

    // await sleep(5000);

    if (req.query?.postId != null && rows.length == 0) {
      return res.status(400).json(rows);
    }
    if (
      rows.length > 0 &&
      req.query?.postId &&
      req.user.userId != rows[0].userId
    )
      return res.status(400).json(rows);
    return res.status(201).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const updatePost = async (req, res) => {
  try {
    const [rows, field] = await PostRepository.updatePost(
      req.params.postId,
      req.body
    );
    // console.log("rows");
    if (rows.affectedRows == 0)
      return res
        .status(404)
        .json({ errors: [{ msg: "User Not found", err: error }] });
    return res.status(201).json(rows);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};

export const deletePost = async (req, res) => {
  try {
    const [rows, field] = await PostRepository.deletePost(req.params.postId);
    return res.status(201).json(rows);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};
