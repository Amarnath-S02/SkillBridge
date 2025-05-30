import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  try {
    if (!req.userId || !req.body.to) {
      return next(createError(400, "Missing required fields"));
    }

    const conversationId = req.isSeller 
      ? `${req.userId}${req.body.to}` 
      : `${req.body.to}${req.userId}`;

    const existingConversation = await Conversation.findOne({ id: conversationId });
    if (existingConversation) {
      return res.status(200).json(existingConversation); // Return existing conversation
    }

    const newConversation = new Conversation({
      id: conversationId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });

    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    console.error("Error creating conversation:", err); // Log full error
    next(createError(500, "Internal Server Error"));
  }
};


export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));

    res.status(200).send(conversation); // Fixed response to avoid nesting
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });

    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
