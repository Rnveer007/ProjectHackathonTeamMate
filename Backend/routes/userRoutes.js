import express from 'express';
import { checkUserToken, loginUser, logoutUser, registerUser } from '../controller/userAuth.js';
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/checkUserToken', checkUserToken, (req, res) => res.send({ message: 'access granteds' }));


export default router