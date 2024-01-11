import ChatRepository from "../repository/ChatRepository.js";

export const getConversations = async (req, res) => {
  try {
    const [rows, field] = await ChatRepository.getConversations(
      req.user.userId
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};

export const createConversations = async (req, res) => {
  const conversation = {
    user1_id: req.body.user1_id ? req.body.user1_id : req.user.userId,
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

const isValidConversation = async (message) => {
  try {
    const [rows, field] = await ChatRepository.getConversationById(
      message.conversationId
    );
    // console.log("IsvalidConversation");
    // console.log(rows);
    if (rows.length == 0) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export const createMessage = async (req, res) => {
  const message = {
    senderId: req.user.userId,
    content: req.body.content,
    conversationId: req.params.conversationId,
  };
  // console.log(message);
  console.log("Adding message " + req.body.content);
  if (!(await isValidConversation(message)))
    return res
      .status(400)
      .json({ errors: [{ msg: "No such conversation exists" }] });

  try {
    await ChatRepository.createMessage(message);
    const [rows, field] = await ChatRepository.getLastMessage(message);

    // console.log(rows);
    return res.status(201).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};

export const getMessages = async (req, res) => {
  try {
    const [row, field] = await ChatRepository.getMessages(
      req.params.conversationId
    );
    return res.status(201).json(row);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};

export const getConversationList = async (req, res) => {
  try {
    const [rows, field] = await ChatRepository.getConversationList(
      req.user.userId
    );
    // console.log(rows);
    return res.status(201).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Database issue", err: error }] });
  }
};
