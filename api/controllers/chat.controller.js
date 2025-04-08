import ChatSession from '../models/chat.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  const { userId, message, userType } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  if (!message || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log("📨 Incoming message:", { userId, message, userType });

  const systemPrompt = `
You are SkillBridge AI, a smart and helpful assistant for users of the SkillBridge platform.
The user is a ${userType}. Provide guidance related to their needs on the platform.
Use the word "Service" instead of "project" or "gig".
Keep answers short, friendly, and helpful.
Support: Registration, Login, Service Listing, Hiring, Orders, Ratings, Messaging.
Never say you are Gemini or Google.
`;

  try {
    let chatSession = await ChatSession.findOne({ userId });

    if (!chatSession) {
      console.log("🆕 Creating new chat session for user:", userId);
      chatSession = await ChatSession.create({
        userId,
        messages: [{ role: 'system', content: systemPrompt }],
      });
    }

    chatSession.messages.push({ role: 'user', content: message });

    const formattedMessages = chatSession.messages.map((msg) => ({
      role: msg.role,
      parts: [msg.content],
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: formattedMessages,
    });

    console.log("📡 Sending message to Gemini:", message);

    const result = await chat.sendMessage(message);
    const botReply = result.response.text();

    console.log("🤖 Gemini replied:", botReply);

    chatSession.messages.push({ role: 'assistant', content: botReply });
    chatSession.messages = chatSession.messages.slice(-20);
    await chatSession.save();

    res.status(200).json({ reply: botReply });
  } catch (err) {
    console.error("❌ Gemini error:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong with Gemini API.' });
  }
};
