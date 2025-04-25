import express from 'express';
import { chatWithAI,getChatHistory,clearChatHistory} from '../controllers/chat.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();
router.post('/', verifyToken, chatWithAI);
router.get('/:userId', verifyToken, getChatHistory);
router.delete('/:userId', verifyToken, clearChatHistory);


export default router;
