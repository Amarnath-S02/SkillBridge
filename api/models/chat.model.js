import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
}, { _id: false });

const chatSessionV2Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now, expires: '2h' },
});

export default mongoose.model('ChatSessionV2', chatSessionV2Schema);
