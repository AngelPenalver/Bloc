import express from 'express';
import register from '../handler/register';
import login from '../handler/login';
import postPublication from '../handler/post_publication';

const router = express.Router()

//rutas para el registro y el login
router.post('/register', register)
router.post('/login', login)

//rutas para los post del bloc
router.post('/post/create', postPublication)

export default router;
