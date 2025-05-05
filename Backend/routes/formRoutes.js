import express from 'express';
import { submitForm } from '../controller/adminController.js';
import {upload} from '../middleware/multer.js'
import {checkAdminToken} from '../controller/adminAuth.js'

const router = express.Router();

router.post('/submit',checkAdminToken, upload.single('image'), submitForm)

export default router