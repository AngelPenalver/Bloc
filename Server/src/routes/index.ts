import express from 'express';
import register from '../handler/register';
import login from '../handler/login';
import postPublication from '../handler/post_publication';
import getAllNote from '../handler/getAllNote';
import getNoteForId from '../handler/getNoteForId';
import getUser from '../handler/getUser';
import deleteUser from '../handler/deleteUser';
import deleteNote from '../handler/deleteNote';
import editUser from '../handler/editUser';

const router = express.Router()

//rutas para el registro y el login
router.post('/register', register)
router.post('/login', login)
router.get('/user/:id', getUser)
router.delete('/user/:id', deleteUser)
router.put('/user/:id', editUser)
//rutas para los post del bloc
router.post('/notes/create', postPublication)
router.put('/notes/update/:noteId', postPublication)
router.get('/notes/user/:userId', getAllNote)
router.get('/notes/:id', getNoteForId)
router.delete('/notes/:id', deleteNote)

export default router;
