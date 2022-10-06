import express from "express";


const router = express.Router();


router.post('/login',login)

router.get('/verify/:token',verifyEmail)


router.post('/forgotPassword',forgotPassword);
router.patch('/resetPassword/:token',resetPassword);

export default router;