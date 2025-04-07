import ChatSession from '../models/chat.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  const { userId, message, userType } = req.body;

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
      chatSession = await ChatSession.create({
        userId,
        messages: [{ role: 'system', content: systemPrompt }],
      });
    }

    chatSession.messages.push({ role: 'user', content: message });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent([
      { role: 'user', parts: [systemPrompt + '\n\nUser: ' + message] },
    ]);

    const botReply = result.response.text();

    const botMessage = { role: 'assistant', content: botReply };
    chatSession.messages.push(botMessage);

    // Trim to last 20 messages
    chatSession.messages = chatSession.messages.slice(-20);

    await chatSession.save();

    res.status(200).json({ reply: botReply });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Something went wrong with Gemini API.' });
  }
};
