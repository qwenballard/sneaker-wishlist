import express from 'express';
import {
  sendMagicLink,
  handleLogin,
  handleLogout,
  getCurrentUser,
} from '../controllers/authController';

const router = express.Router();

router.post('/magic-link', sendMagicLink);
router.post('/callback', handleLogin);
router.post('/logout', handleLogout);
router.get('/me', getCurrentUser);

export default router;
