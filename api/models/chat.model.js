
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
}, { _id: false });

const chatSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now, expires: '1h' } // auto deletes in 1hr
});

export default mongoose.model('ChatSession', chatSessionSchema);
