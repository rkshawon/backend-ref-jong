import express from 'express';
import signIn from './signin.controller';
import signUp from './signup.controller';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);

export default router;
