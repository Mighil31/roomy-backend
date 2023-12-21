import ChatRepository from "../repository/ChatRepository.js";

// export const getConversations = async (req, res) => {};

export const createConversations = async (req, res) => {
  const conversation = {
    user1_id: req.body.user1_id,
    user2_id: req.body.user2_id,
  };

  try {
    const [rows, field] = await ChatRepository.createConversation(conversation);
    return res.status(201).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};
