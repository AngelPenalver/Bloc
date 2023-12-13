import express from 'express';
import register from '../handler/register';
import login from '../handler/login';
import postPublication from '../handler/post_publication';
import getAllPublication from '../handler/getAllPublication';

const router = express.Router()

//rutas para el registro y el login
router.post('/register', register)
router.post('/login', login)

//rutas para los post del bloc
router.post('/notes/create', postPublication)
router.put('/notes/update/:noteId', postPublication)
router.get('/notes/user/:userId', getAllPublication)

export default router;
