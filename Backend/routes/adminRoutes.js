import express from 'express';
import { checkAdminToken, loginAdmin, logoutAdmin, registerAdmin } from '../controller/auth.js';
const router = express.Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/checkAdminToken', checkAdminToken, (req, res) => res.send({ message: 'access granteds' }));



export default router;